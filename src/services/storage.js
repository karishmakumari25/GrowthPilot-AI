// LocalStorage Data Service — Clean local storage without external database dependencies

const getLocal = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
};

const setLocal = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};

export async function saveAnalysisReport(userId, data) {
  const key = `gp_reports_${userId}`;
  const existing = getLocal(key);
  const newReport = {
    id: 'report_' + Date.now(),
    ...data,
    createdAt: { toDate: () => new Date() },
  };
  setLocal(key, [newReport, ...existing]);
  return newReport;
}

export async function getUserReports(userId) {
  return getLocal(`gp_reports_${userId}`);
}

export async function saveCompetitorReport(userId, data) {
  const key = `gp_comp_reports_${userId}`;
  const existing = getLocal(key);
  const newReport = {
    id: 'comp_' + Date.now(),
    ...data,
    createdAt: { toDate: () => new Date() },
  };
  setLocal(key, [newReport, ...existing]);
  return newReport;
}

export async function getUserCompetitorReports(userId) {
  return getLocal(`gp_comp_reports_${userId}`);
}

export async function saveContactForm(formData) {
  const existing = getLocal('gp_contact_forms');
  const entry = { id: 'contact_' + Date.now(), ...formData, createdAt: new Date().toISOString() };
  setLocal('gp_contact_forms', [entry, ...existing]);
  return entry;
}

export async function saveReferralPartner(partnerData) {
  const existing = getLocal('gp_referral_partners');
  const entry = { id: 'ref_' + Date.now(), ...partnerData, createdAt: new Date().toISOString() };
  setLocal('gp_referral_partners', [entry, ...existing]);
  return entry;
}

export async function saveUserProfile(userId, profileData) {
  try {
    localStorage.setItem(`gp_profile_${userId}`, JSON.stringify(profileData));
  } catch {}
  return profileData;
}

export async function getUserProfile(userId) {
  try {
    const stored = localStorage.getItem(`gp_profile_${userId}`);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
