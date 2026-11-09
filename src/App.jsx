import React from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import AboutHala from './components/AboutHala';
import CourseSection from './components/CourseSection';
import FreeVideoSection from './components/FreeVideoSection';
import StoriesReviews from './components/StoriesReviews';
import FaqSection from './components/FaqSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import StudentLmsModal from './components/StudentLmsModal';
import Toast from './components/Toast';

import './styles/theme.css';
import './styles/components.css';

export default function App() {
  return (
    <AppProvider>
      <div className="app-root">
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <AboutHala />
          <CourseSection />
          <FreeVideoSection />
          <StoriesReviews />
          <FaqSection />
          <CtaBanner />
        </main>
        <Footer />

        {/* Premium Modals */}
        <CheckoutModal />
        <StudentLmsModal />
        <Toast />
      </div>
    </AppProvider>
  );
}
