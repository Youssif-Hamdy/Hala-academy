import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, applicationsApi, enrollmentsApi, bookingsApi } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedTrack, setSelectedTrack] = useState('pro');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isLmsModalOpen, setIsLmsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Auth state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hala_session_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#auth' || hash === '#login' || hash === '#signup' || hash === '#register') {
        return 'auth';
      }
      if (hash === '#about-hala') {
        return 'about';
      }
    }
    return 'home';
  });

  // Track student's last submitted email so even before/without login they can track their enrollment request
  const [lastEnrollmentEmail, setLastEnrollmentEmail] = useState(() => {
    return localStorage.getItem('hala_last_enrollment_email') || '';
  });
  const [myEnrollments, setMyEnrollments] = useState([]);

  const refreshEnrollments = useCallback(async () => {
    try {
      const emailToQuery = currentUser?.email || lastEnrollmentEmail;
      const userIdToQuery = currentUser?.id || '';
      if (!emailToQuery && !userIdToQuery) {
        const resAll = await enrollmentsApi.getAllForAdmin();
        setMyEnrollments(resAll.data || []);
        return;
      }
      const res = await enrollmentsApi.getMyEnrollments({
        email: emailToQuery,
        userId: userIdToQuery
      });
      setMyEnrollments(res.data || []);
    } catch (e) {
      console.warn('Could not refresh enrollments:', e);
    }
  }, [currentUser, lastEnrollmentEmail]);

  useEffect(() => {
    refreshEnrollments();
  }, [refreshEnrollments]);

  // Handle URL hash changes for page routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#signup' || hash === '#register') {
        setAuthModalMode('register');
        setCurrentView('auth');
      } else if (hash === '#login' || hash === '#auth') {
        setAuthModalMode('login');
        setCurrentView('auth');
      } else if (hash === '#admin') {
        setAuthModalMode('admin');
        setCurrentView('auth');
      } else if (hash === '#about-hala') {
        setCurrentView('about');
      } else if (
        hash === '#top' ||
        hash === '' ||
        hash.startsWith('#about') ||
        hash.startsWith('#course') ||
        hash.startsWith('#certifications') ||
        hash.startsWith('#free') ||
        hash.startsWith('#stories') ||
        hash.startsWith('#faq')
      ) {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setCurrentView('auth');
    if (typeof window !== 'undefined') {
      window.location.hash = mode === 'register' ? '#signup' : '#login';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAbout = () => {
    setCurrentView('about');
    if (typeof window !== 'undefined') {
      window.location.hash = '#about-hala';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        history.pushState('', document.title, window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Booking / Application Modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Lightbox modals for Certificates & Posts
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activePost, setActivePost] = useState(null);

  const [activeVideoChapter, setActiveVideoChapter] = useState('c1');
  const [isPlayingFreeVideo, setIsPlayingFreeVideo] = useState(false);

  // Student LMS state
  const [enrolledStudent, setEnrolledStudent] = useState({
    name: 'مريم العبدالله',
    email: 'mariam.abdullah@gmail.com',
    trackId: 'pro',
    enrolledAt: '2026-10-15',
    completedLessonIds: ['1-1', '1-2', '2-1']
  });

  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const openEnrollModal = (trackId) => {
    if (trackId) setSelectedTrack(trackId);
    setIsEnrollModalOpen(true);
  };

  const closeEnrollModal = () => {
    setIsEnrollModalOpen(false);
  };

  const openAuthModal = (mode = 'login') => {
    navigateToAuth(mode);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Route primary booking triggers to the unified Course Enrollment & WhatsApp Activation modal
  const openBookingModal = (trackId = 'pro') => {
    if (typeof trackId === 'string') setSelectedTrack(trackId);
    setIsEnrollModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const openLmsModal = () => {
    setIsLmsModalOpen(true);
  };

  const closeLmsModal = () => {
    setIsLmsModalOpen(false);
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
  };

  const createEnrollmentRequest = async ({ courseId, courseName, fullName, email, phone }) => {
    const res = await enrollmentsApi.createRequest({
      userId: currentUser?.id || null,
      courseId,
      courseName,
      fullName,
      email,
      phone
    });
    localStorage.setItem('hala_last_enrollment_email', email.trim().toLowerCase());
    setLastEnrollmentEmail(email.trim().toLowerCase());
    setEnrolledStudent((prev) => ({
      ...prev,
      name: fullName,
      email: email.trim().toLowerCase(),
      trackId: courseId
    }));
    await refreshEnrollments();
    if (res.isDuplicate) {
      showToast('لديكِ طلب اشتراك سابق لنفس الكورس، تم فتح بياناته للمتابعة.');
    } else {
      showToast('تم حفظ طلب الاشتراك وتجهيز رسالة WhatsApp!');
    }
    return res;
  };

  // Auth actions
  const handleLogin = async (email, password) => {
    const res = await authApi.login(email, password);
    setCurrentUser(res.user);
    localStorage.setItem('hala_session_user', JSON.stringify(res.user));
    // حفظ الـ token للموبايل (Safari يحجب الـ Cookies بين الدومينات)
    if (res.token) localStorage.setItem('token', res.token);
    showToast(`مرحباً بكِ مجدداً، ${res.user.name}`);
    setIsAuthModalOpen(false);
    return res.user;
  };

  const handleAdminLogin = async (email, password) => {
    const res = await authApi.adminLogin(email, password);
    setCurrentUser(res.user);
    localStorage.setItem('hala_session_user', JSON.stringify(res.user));
    if (res.token) localStorage.setItem('token', res.token);
    showToast(`تم تسجيل دخول لوحة الإدارة: ${res.user.name}`);
    setIsAuthModalOpen(false);
    return res.user;
  };

  const handleRegister = async (name, email, password) => {
    const res = await authApi.register(name, email, password);
    setCurrentUser(res.user);
    localStorage.setItem('hala_session_user', JSON.stringify(res.user));
    if (res.token) localStorage.setItem('token', res.token);
    showToast(`تم إنشاء حسابكِ بنجاح، أهلاً بكِ يا ${res.user.name}`);
    setIsAuthModalOpen(false);
    return res.user;
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.warn('Logout API error:', e);
    }
    setCurrentUser(null);
    localStorage.removeItem('hala_session_user');
    localStorage.removeItem('token');
    showToast('تم تسجيل الخروج بنجاح');
  };

  const handleApplicationSubmit = async (name, currentChallenges, courseGoal) => {
    const res = await applicationsApi.submit(name, currentChallenges, courseGoal);
    showToast('تم إرسال استمارة الالتحاق بنجاح! سيتم مراجعتها والتواصل معكِ قريباً.');
    setIsBookingModalOpen(false);
    return res.application || res;
  };

  // إرسال طلب حجز الكورس — POST /api/bookings
  const handleCreateBooking = async (name, phone, email) => {
    const res = await bookingsApi.createBooking(name, phone, email);
    showToast('تم تسجيل طلب الحجز بنجاح! سيتم التواصل معكِ قريباً.');
    return res.booking || res;
  };

  const toggleLessonCompleted = (lessonId) => {
    setEnrolledStudent((prev) => {
      const exists = prev.completedLessonIds.includes(lessonId);
      const updated = exists
        ? prev.completedLessonIds.filter((id) => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];
      return { ...prev, completedLessonIds: updated };
    });
  };

  return (
    <AppContext.Provider
      value={{
        selectedTrack,
        setSelectedTrack,
        isEnrollModalOpen,
        openEnrollModal,
        closeEnrollModal,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
        currentView,
        navigateToAuth,
        navigateToAbout,
        navigateToHome,
        currentUser,
        login: handleLogin,
        adminLogin: handleAdminLogin,
        register: handleRegister,
        logout: handleLogout,
        submitApplication: handleApplicationSubmit,
        createBooking: handleCreateBooking,
        myEnrollments,
        refreshEnrollments,
        createEnrollmentRequest,
        isAdminModalOpen,
        openAdminModal,
        closeAdminModal,
        activeCertificate,
        setActiveCertificate,
        activePost,
        setActivePost,
        isLmsModalOpen,
        openLmsModal,
        closeLmsModal,
        isQuizModalOpen,
        setIsQuizModalOpen,
        activeVideoChapter,
        setActiveVideoChapter,
        isPlayingFreeVideo,
        setIsPlayingFreeVideo,
        enrolledStudent,
        setEnrolledStudent,
        toggleLessonCompleted,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
