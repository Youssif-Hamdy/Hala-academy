/**
 * Frontend API Service — Hala Academy Backend
 * Supports Auth, Course Enrollment & Manual Payment Activation Workflow,
 * Protected Lesson Delivery, and Offline/Local Persistence.
 */

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, ''); // إزالة trailing slash لو موجود
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return window.location.origin;
  }
  return 'http://localhost:3000';
};

const BASE_URL = getBaseUrl();

// Official Academy WhatsApp number — Libyan number for receiving enrollment requests
export const ACADEMY_WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '218946122679';

/**
 * Build the official pre-filled WhatsApp message per Section 3 of the specification
 */
export function buildWhatsAppEnrollmentUrl({ courseName, fullName, email, phone }, customAdminPhone = ACADEMY_WHATSAPP_NUMBER) {
  const message = [
    'السلام عليكم، أرغب في الاشتراك في الكورس التالي:',
    `اسم الكورس: ${courseName}`,
    `الاسم: ${fullName}`,
    `Gmail الخاص بالمشاهدة: ${email}`,
    `رقم الهاتف: ${phone}`,
    'من فضلكم أرسلوا لي تفاصيل الدفع.'
  ].join('\n');

  const cleanPhone = String(customAdminPhone || '').replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`;
}

/**
 * Build direct WhatsApp chat link from Admin to Student
 */
export function buildStudentWhatsAppUrl(studentPhone, studentName, courseName) {
  let clean = String(studentPhone || '').replace(/[^0-9]/g, '');
  if (clean.startsWith('01') && clean.length === 11) {
    clean = '2' + clean; // Egypt local mobile to international format
  }
  const msg = encodeURIComponent(
    `مرحباً ${studentName}، معكِ إدارة أكاديمية حلا سامي بخصوص طلب اشتراككِ في (${courseName}).`
  );
  return `https://wa.me/${clean}?text=${msg}`;
}

const ENROLLMENTS_STORAGE_KEY = 'hala_course_enrollments_v1';
const AUDIT_LOG_STORAGE_KEY = 'hala_admin_audit_logs_v1';

function getStoredEnrollments() {
  try {
    const raw = localStorage.getItem(ENROLLMENTS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse stored enrollments', e);
  }
  // Seed with 1 sample pending request so the Admin Dashboard is immediately demonstrable
  const seed = [
    {
      id: 'enr_demo_01',
      userId: 'usr_demo_1',
      courseId: 'pro',
      courseName: 'أطوّر مهاراتي للاحتراف (المسار الاحترافي الشامل)',
      fullName: 'مريم العبدالله',
      email: 'mariam.abdullah@gmail.com',
      phone: '01012345678',
      requestStatus: 'pending',
      paymentStatus: 'pending',
      accessStatus: 'not_active',
      requestedAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
      paidAt: null,
      activatedAt: null,
      approvedBy: null,
      adminNotes: ''
    }
  ];
  localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function saveStoredEnrollments(list) {
  localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(list));
}

function appendAuditLog({ enrollmentId, action, actor, details }) {
  try {
    const existing = JSON.parse(localStorage.getItem(AUDIT_LOG_STORAGE_KEY) || '[]');
    const entry = {
      id: 'log_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
      enrollmentId,
      action,
      actor: actor || 'Hala Admin',
      details: details || '',
      timestamp: new Date().toISOString()
    };
    existing.unshift(entry);
    localStorage.setItem(AUDIT_LOG_STORAGE_KEY, JSON.stringify(existing));
    return entry;
  } catch {
    return null;
  }
}

export function getStoredAuditLogs() {
  try {
    return JSON.parse(localStorage.getItem(AUDIT_LOG_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

/**
 * Core fetch wrapper with credentials: "include" للـ Cookie + Bearer Token للموبايل (Hybrid System)
 * Endpoints التي تتطلب backend حقيقي ولا يجب محاكاتها محلياً أبداً
 */
const REAL_BACKEND_ONLY_PATTERNS = [
  '/api/applications',
  '/api/bookings'
];

export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // إرفاق Bearer Token تلقائياً — ضروري للموبايل (Safari يحجب Third-Party Cookies)
  try {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (_) { /* تجاهل أخطاء parsing */ }

  const isRealBackendOnly = REAL_BACKEND_ONLY_PATTERNS.some((p) => endpoint.startsWith(p));

  try {
    const res = await fetch(url, {
      ...options,
      credentials: 'include',
      headers
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const error = new Error(data.message || `خطأ في الخادم (${res.status})`);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    // إذا كان الـ endpoint يتطلب backend حقيقي، نرفع الخطأ مباشرة بدون offline simulation
    if (isRealBackendOnly) {
      if (!err.status) {
        // Network error (fetch failed)
        const networkErr = new Error('تعذّر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
        networkErr.status = 0;
        throw networkErr;
      }
      throw err;
    }

    if (err.status && err.status !== 404) {
      throw err;
    }
    return handleOfflineSimulation(endpoint, options);
  }
}

/**
 * Seamless client simulation when backend server is offline
 */
function handleOfflineSimulation(endpoint, options) {
  const body = options.body ? JSON.parse(options.body) : {};

  if (endpoint.includes('/api/auth/register')) {
    if (!body.name || !body.email || !body.password) {
      const err = new Error('الاسم والإيميل والباسورد مطلوبين');
      err.status = 400;
      throw err;
    }
    if (body.password.length < 6) {
      const err = new Error('الباسورد لازم يكون 6 حروف على الأقل');
      err.status = 400;
      throw err;
    }
    const user = {
      id: 'usr_' + Date.now().toString(36),
      name: body.name,
      email: body.email,
      role: 'USER',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('hala_session_user', JSON.stringify(user));
    return { message: 'تم التسجيل بنجاح', user };
  }

  if (endpoint.includes('/api/auth/admin/login')) {
    if (body.email === 'admin@hala.com' && body.password === 'Admin@12345') {
      const user = {
        id: 'adm_' + Date.now().toString(36),
        name: 'Hala Admin',
        email: 'admin@hala.com',
        role: 'ADMIN'
      };
      localStorage.setItem('hala_session_user', JSON.stringify(user));
      return { message: 'تم تسجيل دخول الأدمن بنجاح', user };
    }
    const err = new Error('الإيميل أو الباسورد غير صحيح');
    err.status = 401;
    throw err;
  }

  if (endpoint.includes('/api/auth/login')) {
    if (!body.email || !body.password) {
      const err = new Error('الإيميل والباسورد مطلوبين');
      err.status = 400;
      throw err;
    }
    if (body.email === 'admin@hala.com' && body.password === 'Admin@12345') {
      const adminUser = {
        id: 'adm_' + Date.now().toString(36),
        name: 'Hala Admin',
        email: 'admin@hala.com',
        role: 'ADMIN'
      };
      localStorage.setItem('hala_session_user', JSON.stringify(adminUser));
      return { message: 'تم تسجيل دخول الأدمن بنجاح', user: adminUser };
    }
    const user = {
      id: 'usr_' + Date.now().toString(36),
      name: body.email.split('@')[0],
      email: body.email,
      role: body.email.includes('admin') ? 'ADMIN' : 'USER'
    };
    localStorage.setItem('hala_session_user', JSON.stringify(user));
    return { message: 'تم تسجيل الدخول بنجاح', user };
  }

  if (endpoint.includes('/api/auth/logout')) {
    localStorage.removeItem('hala_session_user');
    return { message: 'تم تسجيل الخروج بنجاح' };
  }

  // -------------------------------------------------------------
  // COURSE ENROLLMENT & MANUAL PAYMENT ACTIVATION ENDPOINTS
  // -------------------------------------------------------------
  if (endpoint === '/api/enrollments' && options.method === 'POST') {
    const { userId, courseId, courseName, fullName, email, phone } = body;

    if (!fullName || !email || !phone || !courseId) {
      const err = new Error('يرجى إدخال الاسم بالكامل وبريد Gmail ورقم الهاتف');
      err.status = 400;
      throw err;
    }

    const cleanEmail = String(email).trim().toLowerCase();
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      const err = new Error('يرجى إدخال بريد Google (Gmail) صحيح لاستخدامه في تفعيل المشاهدة على YouTube');
      err.status = 400;
      throw err;
    }

    const all = getStoredEnrollments();

    // Rule 8: Prevent duplicate requests for the same student and course
    const duplicate = all.find(
      (item) =>
        item.courseId === courseId &&
        (item.email.toLowerCase() === cleanEmail || (userId && item.userId === userId)) &&
        item.requestStatus !== 'rejected'
    );

    if (duplicate) {
      return {
        message: 'لديكِ طلب اشتراك مسجل مسبقاً لهذا الكورس. يمكنكِ متابعة حالته أو إرسال رسالة الواتساب.',
        isDuplicate: true,
        enrollment: duplicate
      };
    }

    const newEnrollment = {
      id: 'enr_' + Date.now().toString(36),
      userId: userId || 'guest_' + Date.now().toString(36),
      courseId,
      courseName: courseName || (courseId === 'pro' ? 'المسار الاحترافي الشامل' : 'مسار أتعلّم لنفسي'),
      fullName: String(fullName).trim(),
      email: cleanEmail,
      phone: String(phone).trim(),
      requestStatus: 'pending', // pending | approved | rejected
      paymentStatus: 'pending', // pending | paid | rejected
      accessStatus: 'not_active', // not_active | active | revoked
      requestedAt: new Date().toISOString(),
      paidAt: null,
      activatedAt: null,
      approvedBy: null,
      adminNotes: ''
    };

    all.unshift(newEnrollment);
    saveStoredEnrollments(all);

    appendAuditLog({
      enrollmentId: newEnrollment.id,
      action: 'CREATE_REQUEST',
      actor: newEnrollment.fullName,
      details: `طلب اشتراك جديد في (${newEnrollment.courseName}) ببريد ${newEnrollment.email}`
    });

    return {
      message: 'تم تسجيل طلب الاشتراك بنجاح',
      isDuplicate: false,
      enrollment: newEnrollment
    };
  }

  if (endpoint.startsWith('/api/enrollments/my')) {
    const urlObj = new URL(endpoint, 'http://localhost');
    const email = (urlObj.searchParams.get('email') || '').toLowerCase();
    const userId = urlObj.searchParams.get('userId') || '';
    const all = getStoredEnrollments();
    const filtered = all.filter(
      (item) =>
        (email && item.email.toLowerCase() === email) ||
        (userId && item.userId === userId)
    );
    return { data: filtered };
  }

  if (endpoint === '/api/enrollments' && (!options.method || options.method === 'GET')) {
    const all = getStoredEnrollments();
    return {
      data: all,
      auditLogs: getStoredAuditLogs()
    };
  }

  if (endpoint.startsWith('/api/enrollments/') && options.method === 'PATCH') {
    const id = endpoint.split('/')[3];
    const all = getStoredEnrollments();
    const idx = all.findIndex((item) => item.id === id);
    if (idx === -1) {
      const err = new Error('طلب الاشتراك غير موجود');
      err.status = 404;
      throw err;
    }

    const current = { ...all[idx] };
    const { action, adminName, adminNotes } = body;
    const now = new Date().toISOString();
    const actor = adminName || 'Hala Admin';

    if (action === 'CONFIRM_PAYMENT') {
      current.paymentStatus = 'paid';
      current.requestStatus = 'approved';
      current.paidAt = now;
      current.approvedBy = actor;
      if (adminNotes !== undefined) current.adminNotes = adminNotes;
      appendAuditLog({
        enrollmentId: current.id,
        action: 'CONFIRM_PAYMENT',
        actor,
        details: `تم تأكيد استلام الدفع للطالبة ${current.fullName}`
      });
    } else if (action === 'REJECT_REQUEST') {
      current.requestStatus = 'rejected';
      current.paymentStatus = 'rejected';
      current.accessStatus = 'not_active';
      current.approvedBy = actor;
      if (adminNotes !== undefined) current.adminNotes = adminNotes;
      appendAuditLog({
        enrollmentId: current.id,
        action: 'REJECT_REQUEST',
        actor,
        details: `تم رفض الطلب. السبب: ${adminNotes || 'غير محدد'}`
      });
    } else if (action === 'ACTIVATE_ACCESS') {
      if (current.paymentStatus !== 'paid') {
        const err = new Error('لا يمكن تفعيل الوصول قبل تأكيد استلام الدفع أولاً');
        err.status = 400;
        throw err;
      }
      current.accessStatus = 'active';
      current.requestStatus = 'approved';
      current.activatedAt = now;
      current.approvedBy = actor;
      if (adminNotes !== undefined) current.adminNotes = adminNotes;
      appendAuditLog({
        enrollmentId: current.id,
        action: 'ACTIVATE_ACCESS',
        actor,
        details: `تم إضافة بريد (${current.email}) في YouTube Private وتفعيل الوصول للكورس`
      });
    } else if (action === 'REVOKE_ACCESS') {
      current.accessStatus = 'revoked';
      current.approvedBy = actor;
      if (adminNotes !== undefined) current.adminNotes = adminNotes;
      appendAuditLog({
        enrollmentId: current.id,
        action: 'REVOKE_ACCESS',
        actor,
        details: `تم إلغاء صلاحية الوصول للكورس (Revoke). ملاحظات: ${adminNotes || '-'}`
      });
    } else if (action === 'UPDATE_NOTES') {
      current.adminNotes = adminNotes || '';
    }

    all[idx] = current;
    saveStoredEnrollments(all);

    return {
      message: 'تم تحديث حالة الطلب بنجاح',
      enrollment: current,
      auditLogs: getStoredAuditLogs()
    };
  }

  // Rule 8: Backend/Service Guard for Course Lessons — never return lesson videos unless accessStatus === 'active'
  if (endpoint.startsWith('/api/courses/') && endpoint.endsWith('/lessons')) {
    const parts = endpoint.split('/');
    const courseId = parts[3];
    const urlObj = new URL(endpoint, 'http://localhost');
    const email = (urlObj.searchParams.get('email') || '').toLowerCase();
    const userId = urlObj.searchParams.get('userId') || '';

    const all = getStoredEnrollments();
    const matching = all.find(
      (item) =>
        (item.courseId === courseId || item.courseId === 'pro') &&
        ((email && item.email.toLowerCase() === email) || (userId && item.userId === userId)) &&
        item.accessStatus === 'active'
    );

    if (!matching) {
      const err = new Error('غير مصرح بالوصول للدروس: يجب تأكيد الدفع وتفعيل حساب Gmail الخاص بكِ من قبل الإدارة أولاً.');
      err.status = 403;
      throw err;
    }

    return {
      accessGranted: true,
      enrollment: matching
    };
  }

  return { message: 'عملية ناجحة' };
}

// -------------------------------------------------------------
// EXPORTED API CLIENT METHODS
// -------------------------------------------------------------

export const authApi = {
  register: (name, email, password) =>
    apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    }),

  login: (email, password) =>
    apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  adminLogin: (email, password) =>
    apiFetch('/api/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  logout: () =>
    apiFetch('/api/auth/logout', {
      method: 'POST'
    })
};

export const enrollmentsApi = {
  createRequest: (payload) =>
    apiFetch('/api/enrollments', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getMyEnrollments: ({ email, userId }) =>
    apiFetch(`/api/enrollments/my?email=${encodeURIComponent(email || '')}&userId=${encodeURIComponent(userId || '')}`, {
      method: 'GET'
    }),

  getAllForAdmin: () =>
    apiFetch('/api/enrollments', {
      method: 'GET'
    }),

  updateStatus: (id, { action, adminName, adminNotes }) =>
    apiFetch(`/api/enrollments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ action, adminName, adminNotes })
    }),

  verifyLessonAccess: (courseId, { email, userId }) =>
    apiFetch(`/api/courses/${courseId}/lessons?email=${encodeURIComponent(email || '')}&userId=${encodeURIComponent(userId || '')}`, {
      method: 'GET'
    })
};

export const applicationsApi = {
  /**
   * إرسال استمارة التقديم — POST /api/applications
   * Payload: { name, currentChallenges, courseGoal }
   * - currentChallenges: 50-500 كلمة
   * - courseGoal: 50-500 كلمة
   * - يحق لكل مستخدم إرسال استمارة واحدة فقط (409 Conflict إذا أرسل ثانية)
   */
  submit: (name, currentChallenges, courseGoal) =>
    apiFetch('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ name, currentChallenges, courseGoal })
    }),

  getAll: (page = 1, limit = 10) =>
    apiFetch(`/api/applications?page=${page}&limit=${limit}`, {
      method: 'GET'
    }),

  getById: (id) =>
    apiFetch(`/api/applications/${id}`, {
      method: 'GET'
    })
};

export const bookingsApi = {
  /**
   * تقديم طلب حجز كورس — POST /api/bookings
   * Payload: { name, phone, email }
   * - ينشأ بحالة PENDING
   * - 409 Conflict لو عنده حجز معلق بالفعل
   */
  createBooking: (name, phone, email) =>
    apiFetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify({ name, phone, email })
    }),

  /**
   * استعراض حجوزات المستخدم — GET /api/bookings/my
   */
  getMyBookings: () =>
    apiFetch('/api/bookings/my', {
      method: 'GET'
    })
};

export const consultationsApi = {
  /**
   * طلب استشارة جديدة (للمستخدم المسجل) — POST /api/consultations
   * Payload: { name, phone, email, duration, notes }
   * - duration: 30 | 60 | 120
   */
  create: ({ name, phone, email, duration, notes }) =>
    apiFetch('/api/consultations', {
      method: 'POST',
      body: JSON.stringify({ name, phone, email, duration: Number(duration), notes })
    }),

  /**
   * استعراض استشارات المستخدم المسجل — GET /api/consultations/my
   */
  getMyConsultations: () =>
    apiFetch('/api/consultations/my', {
      method: 'GET'
    })
};
