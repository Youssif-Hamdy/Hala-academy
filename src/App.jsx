import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CertificationsStrip from './components/CertificationsStrip';
import AboutHala from './components/AboutHala';
import PressArticlesSection from './components/PressArticlesSection';
import TaglineReveal from './components/TaglineReveal';
import CourseSection from './components/CourseSection';
import FreeVideoSection from './components/FreeVideoSection';
import StoriesReviews from './components/StoriesReviews';
import FaqSection from './components/FaqSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

// Premium Modals
import AuthPage from './components/AuthPage';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal';
import MediaLightboxModal from './components/MediaLightboxModal';
import CheckoutModal from './components/CheckoutModal';
import StudentLmsModal from './components/StudentLmsModal';
import Toast from './components/Toast';

import './styles/theme.css';
import './styles/components.css';

function AppContent() {
  const { currentView } = useApp();

  if (currentView === 'auth') {
    return (
      <div className="app-root">
        <AuthPage />
        <Toast />
      </div>
    );
  }

  return (
    <div className="app-root">
      <a href="#main-content" className="skip-link">تخطي إلى المحتوى الرئيسي</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <CertificationsStrip />
        <AboutHala />
        <PressArticlesSection />
        <TaglineReveal />
        <CourseSection />
        <FreeVideoSection />
        <StoriesReviews />
        <CtaBanner />
        <FaqSection />
      </main>
      <Footer />

      {/* Dynamic Modals */}
      <AuthModal />
      <BookingModal />
      <MediaLightboxModal />
      <CheckoutModal />
      <StudentLmsModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
