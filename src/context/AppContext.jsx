import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedTrack, setSelectedTrack] = useState('pro');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isLmsModalOpen, setIsLmsModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeVideoChapter, setActiveVideoChapter] = useState('c1');
  const [isPlayingFreeVideo, setIsPlayingFreeVideo] = useState(false);
  
  // Student LMS mock state
  const [enrolledStudent, setEnrolledStudent] = useState({
    name: 'مريم العبدالله',
    email: 'mariam@example.com',
    trackId: 'pro',
    enrolledAt: '2026-10-15',
    completedLessonIds: ['1-1', '1-2', '2-1']
  });

  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const openEnrollModal = (trackId) => {
    if (trackId) setSelectedTrack(trackId);
    setIsEnrollModalOpen(true);
  };

  const closeEnrollModal = () => {
    setIsEnrollModalOpen(false);
  };

  const openLmsModal = () => {
    setIsLmsModalOpen(true);
  };

  const closeLmsModal = () => {
    setIsLmsModalOpen(false);
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
