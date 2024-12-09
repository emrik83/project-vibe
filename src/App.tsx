import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import HomePage from './pages/HomePage';
import ModelsPage from './pages/ModelsPage';
import ModelDetailPage from './pages/ModelDetailPage';
import PricingPage from './pages/PricingPage';
import UploadPage from './pages/UploadPage';
import JoinPage from './pages/JoinPage';
import SignUpPage from './pages/SignUpPage';
import VibePage from './pages/VibePage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/*"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/models" element={<ModelsPage />} />
                    <Route path="/models/:id" element={<ModelDetailPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/join" element={<JoinPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/vibe" element={<VibePage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}