// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Layout from '../components/Layout';

// // Pages
// import Home              from '../pages/Home';
// import Login             from '../pages/Login';
// import Signup            from '../pages/Signup';
// import ForgotPassword    from '../pages/ForgotPassword';
// import AIAnalyzer        from '../pages/AIAnalyzer';
// import CompetitorAnalysis from '../pages/CompetitorAnalysis';
// import Pricing           from '../pages/Pricing';
// import Contact           from '../pages/Contact';
// import ReferralProgram   from '../pages/ReferralProgram';
// import Dashboard         from '../pages/Dashboard';
// import NotFound          from '../pages/NotFound';

// // Protected route wrapper
// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   if (loading) return null;
//   return user ? children : <Navigate to="/login" replace />;
// }

// export default function AppRouter() {
//   return (
//     <Layout>
//       <Routes>
//         <Route path="/"                    element={<Home />} />
//         <Route path="/login"               element={<Login />} />
//         <Route path="/signup"              element={<Signup />} />
//         <Route path="/forgot-password"     element={<ForgotPassword />} />
//         <Route path="/ai-analyzer"         element={<AIAnalyzer />} />
//         <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
//         <Route path="/pricing"             element={<Pricing />} />
//         <Route path="/contact"             element={<Contact />} />
//         <Route path="/referral-program"    element={<ReferralProgram />} />
//         <Route path="/dashboard"           element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="*"                    element={<NotFound />} />
//       </Routes>
//     </Layout>
//   );
// }





import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import AIAnalyzer from '../pages/AIAnalyzer';
import CompetitorAnalysis from '../pages/CompetitorAnalysis';
import Pricing from '../pages/Pricing';
import Contact from '../pages/Contact';
import ReferralProgram from '../pages/ReferralProgram';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';


function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? children : <Navigate to="/login" replace />;
}


export default function AppRouter() {
  return (
    <>

      <Layout>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route 
            path="/forgot-password" 
            element={<ForgotPassword />} 
          />

          <Route 
            path="/ai-analyzer" 
            element={<AIAnalyzer />} 
          />

          <Route 
            path="/competitor-analysis" 
            element={<CompetitorAnalysis />} 
          />

          <Route 
            path="/pricing" 
            element={<Pricing />} 
          />

          <Route 
            path="/contact" 
            element={<Contact />} 
          />

          <Route 
            path="/referral-program" 
            element={<ReferralProgram />} 
          />


          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          <Route path="*" element={<NotFound />} />

        </Routes>

      </Layout>

    </>
  );
}