// Firestore service
// Demo mode: stores data in localStorage when Firebase keys are not configured.
// Real mode: uses Firebase Firestore when keys are present in .env

import { db } from './firebase';
import {
  collection, addDoc, getDocs, getDoc, doc,
  query, where, orderBy, serverTimestamp, updateDoc, setDoc, deleteDoc,
} from 'firebase/firestore';

const FIREBASE_CONFIGURED =
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY.length > 10;

/* ── Local storage helpers (demo mode) ───────────────────── */
function lsGet(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function lsAdd(collection, data) {
  const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
  const item = { id, ...data, createdAt: { toDate: () => new Date() } };
  const arr = lsGet('gp_' + collection);
  arr.unshift(item);
  lsSet('gp_' + collection, arr);
  return id;
}
function lsQuery(collection, filterFn = () => true) {
  return lsGet('gp_' + collection).filter(filterFn);
}

/* ── Generic Firestore helpers ───────────────────────────── */
export async function addDocument(col, data) {
  if (!FIREBASE_CONFIGURED) return lsAdd(col, data);
  const ref = await addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });
  return ref.id;
}

export async function getDocuments(col, constraints = []) {
  if (!FIREBASE_CONFIGURED) return lsQuery(col);
  const q = query(collection(db, col), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getDocumentById(col, id) {
  if (!FIREBASE_CONFIGURED) {
    const arr = lsGet('gp_' + col);
    return arr.find(i => i.id === id) || null;
  }
  const snap = await getDoc(doc(db, col, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateDocument(col, id, data) {
  if (!FIREBASE_CONFIGURED) {
    const arr = lsGet('gp_' + col);
    const idx = arr.findIndex(i => i.id === id);
    if (idx !== -1) { arr[idx] = { ...arr[idx], ...data }; lsSet('gp_' + col, arr); }
    return;
  }
  await updateDoc(doc(db, col, id), { ...data, updatedAt: serverTimestamp() });
}

/* ── Contact form ────────────────────────────────────────── */
export async function saveContactForm(data) {
  return addDocument('contacts', data);
}

/* ── Business analysis reports ───────────────────────────── */
export async function saveAnalysisReport(uid, data) {
  return addDocument('reports', { uid, ...data });
}

export async function getUserReports(uid) {
  if (!FIREBASE_CONFIGURED) return lsQuery('reports', i => i.uid === uid);
  return getDocuments('reports', [where('uid', '==', uid), orderBy('createdAt', 'desc')]);
}

/* ── Competitor reports ──────────────────────────────────── */
export async function saveCompetitorReport(uid, data) {
  return addDocument('competitorReports', { uid, ...data });
}

export async function getUserCompetitorReports(uid) {
  if (!FIREBASE_CONFIGURED) return lsQuery('competitorReports', i => i.uid === uid);
  return getDocuments('competitorReports', [where('uid', '==', uid), orderBy('createdAt', 'desc')]);
}

/* ── Referral partners ───────────────────────────────────── */
export async function saveReferralPartner(data) {
  return addDocument('referrals', data);
}

/* ── User profile ────────────────────────────────────────── */
export async function saveUserProfile(uid, data) {
  if (!FIREBASE_CONFIGURED) {
    lsSet('gp_profile_' + uid, { uid, ...data });
    return;
  }
  const ref = doc(db, 'users', uid);
  await setDoc(ref, { uid, ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getUserProfile(uid) {
  if (!FIREBASE_CONFIGURED) {
    const p = localStorage.getItem('gp_profile_' + uid);
    return p ? JSON.parse(p) : null;
  }
  return getDocumentById('users', uid);
}
