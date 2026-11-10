# 📡 Frontend API Guide — Hala Backend

---

## أولاً: الإعداد الأساسي

### Base URL
```
http://localhost:3000
```
> في الـ production غيّرها لرابط السيرفر الحقيقي.

---

### ⚠️ إعداد مهم جداً — Cookies

الـ Authentication بيشتغل بـ **HttpOnly Cookies**، يعني لازم كل request تبعته مع `credentials: 'include'` عشان الكوكي تتبعت تلقائياً.

````carousel
**إعداد fetch (مرة واحدة في مشروعك)**
```js
// اعمل wrapper بسيط تستخدمه في كل مكان
const api = (url, options = {}) =>
  fetch(`http://localhost:3000${url}`, {
    ...options,
    credentials: "include",             // ← المهم دي
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
```
<!-- slide -->
**إعداد axios (مرة واحدة في مشروعك)**
```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,               // ← المهم دي
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```
````

---

## ثانياً: الـ Endpoints

---

### 🔐 Auth

#### `POST /api/auth/register` — تسجيل يوزر جديد

**Request Body:**
```json
{
  "name": "Ahmed Mohamed",
  "email": "ahmed@example.com",
  "password": "123456"
}
```

**Response `201` ✅**
```json
{
  "message": "تم التسجيل بنجاح",
  "user": {
    "id": "cmw96fxmz0000uo2x...",
    "name": "Ahmed Mohamed",
    "email": "ahmed@example.com",
    "role": "USER",
    "createdAt": "2026-11-09T12:00:00.000Z"
  }
}
```
> الكوكي بتتحط **تلقائياً** في الـ browser — مش محتاج تعمل حاجة.

**Errors:**

| Status | رسالة |
|--------|-------|
| `400` | `"الاسم والإيميل والباسورد مطلوبين"` |
| `400` | `"الباسورد لازم يكون 6 حروف على الأقل"` |
| `409` | `"الإيميل ده موجود بالفعل"` |

````carousel
**fetch**
```js
const res = await api("/api/auth/register", {
  method: "POST",
  body: JSON.stringify({
    name: "Ahmed Mohamed",
    email: "ahmed@example.com",
    password: "123456",
  }),
});
const data = await res.json();
```
<!-- slide -->
**axios**
```js
const { data } = await api.post("/api/auth/register", {
  name: "Ahmed Mohamed",
  email: "ahmed@example.com",
  password: "123456",
});
```
````

---

#### `POST /api/auth/login` — تسجيل دخول اليوزر

**Request Body:**
```json
{
  "email": "ahmed@example.com",
  "password": "123456"
}
```

**Response `200` ✅**
```json
{
  "message": "تم تسجيل الدخول بنجاح",
  "user": {
    "id": "cmw96fxmz0000uo2x...",
    "name": "Ahmed Mohamed",
    "email": "ahmed@example.com",
    "role": "USER"
  }
}
```

**Errors:**

| Status | رسالة |
|--------|-------|
| `400` | `"الإيميل والباسورد مطلوبين"` |
| `401` | `"الإيميل أو الباسورد غلط"` |

````carousel
**fetch**
```js
const res = await api("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({
    email: "ahmed@example.com",
    password: "123456",
  }),
});
const data = await res.json();
// data.user.role === "USER" أو "ADMIN"
```
<!-- slide -->
**axios**
```js
const { data } = await api.post("/api/auth/login", {
  email: "ahmed@example.com",
  password: "123456",
});
// data.user.role === "USER" أو "ADMIN"
```
````

---

#### `POST /api/auth/admin/login` — تسجيل دخول الأدمن

> نفس login بالظبط، بس بيرفض أي حساب role مش ADMIN.

**Request Body:**
```json
{
  "email": "admin@hala.com",
  "password": "Admin@12345"
}
```

**Response `200` ✅**
```json
{
  "message": "تم تسجيل دخول الأدمن بنجاح",
  "user": {
    "id": "cmw972mef0000zqz8...",
    "name": "Hala Admin",
    "email": "admin@hala.com",
    "role": "ADMIN"
  }
}
```

**Errors:**

| Status | رسالة |
|--------|-------|
| `401` | `"الإيميل أو الباسورد غلط"` |
| `403` | `"انت مش أدمن"` |

---

#### `POST /api/auth/logout` — تسجيل خروج

> يمسح الكوكي من الـ browser — مش محتاج body.

**Response `200` ✅**
```json
{
  "message": "تم تسجيل الخروج بنجاح"
}
```

````carousel
**fetch**
```js
const res = await api("/api/auth/logout", { method: "POST" });
const data = await res.json();
// بعدها وجّه اليوزر لصفحة الـ login
```
<!-- slide -->
**axios**
```js
const { data } = await api.post("/api/auth/logout");
// بعدها وجّه اليوزر لصفحة الـ login
```
````

---

### 📋 Applications (الاستمارة)

---

#### `POST /api/applications` — تقديم الاستمارة

> **يتطلب:** يوزر مسجل دخول (الكوكي بتتبعت تلقائياً).

**Request Body:**
```json
{
  "name": "Ahmed Mohamed",
  "currentChallenges": "نص التحديات... (50 → 500 كلمة)",
  "courseGoal": "نص الهدف... (50 → 500 كلمة)"
}
```

**Response `201` ✅**
```json
{
  "message": "تم تقديم الاستمارة بنجاح",
  "application": {
    "id": "cmw9746rq0002uo2x...",
    "userId": "cmw96fxmz0000uo2x...",
    "name": "Ahmed Mohamed",
    "currentChallenges": "...",
    "courseGoal": "...",
    "createdAt": "2026-11-09T12:00:00.000Z",
    "updatedAt": "2026-11-09T12:00:00.000Z",
    "user": {
      "id": "...",
      "name": "Ahmed Mohamed",
      "email": "ahmed@example.com"
    }
  }
}
```

**Errors:**

| Status | رسالة |
|--------|-------|
| `401` | `"لازم تسجل دخول الأول"` |
| `400` | `"الاسم وأبرز التحديات والهدف من الكورس مطلوبين"` |
| `400` | `"أبرز التحديات تجاوز الحد الأقصى (XXX/500 كلمة)"` |
| `400` | `"أبرز التحديات قصير جداً (XXX/50 كلمة على الأقل)"` |
| `400` | `"هدف الكورس تجاوز الحد الأقصى (XXX/500 كلمة)"` |
| `400` | `"هدف الكورس قصير جداً (XXX/50 كلمة على الأقل)"` |
| `409` | `"انت قدمت استمارة قبل كده"` |

````carousel
**fetch**
```js
const res = await api("/api/applications", {
  method: "POST",
  body: JSON.stringify({
    name: "Ahmed Mohamed",
    currentChallenges: "نص التحديات...",
    courseGoal: "نص الهدف...",
  }),
});

if (res.status === 401) {
  // وجّه لصفحة الـ login
}
const data = await res.json();
```
<!-- slide -->
**axios**
```js
try {
  const { data } = await api.post("/api/applications", {
    name: "Ahmed Mohamed",
    currentChallenges: "نص التحديات...",
    courseGoal: "نص الهدف...",
  });
} catch (err) {
  if (err.response?.status === 401) {
    // وجّه لصفحة الـ login
  }
  console.log(err.response?.data?.message);
}
```
````

---

#### `GET /api/applications` — جلب كل الاستمارات

> **أدمن فقط** — غير الأدمن هيرجع `403`.

**Query Params (اختياري):**
```
?page=1&limit=10
```

**Response `200` ✅**
```json
{
  "message": "تم جلب الاستمارات بنجاح",
  "data": [
    {
      "id": "cmw9746rq0002uo2x...",
      "name": "Ahmed Mohamed",
      "currentChallenges": "...",
      "courseGoal": "...",
      "createdAt": "2026-11-09T12:00:00.000Z",
      "user": {
        "id": "...",
        "name": "Ahmed Mohamed",
        "email": "ahmed@example.com"
      }
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

````carousel
**fetch**
```js
const res = await api("/api/applications?page=1&limit=10");
const data = await res.json();
// data.data        ← array الاستمارات
// data.pagination  ← بيانات الـ pagination
```
<!-- slide -->
**axios**
```js
const { data } = await api.get("/api/applications", {
  params: { page: 1, limit: 10 },
});
// data.data        ← array الاستمارات
// data.pagination  ← بيانات الـ pagination
```
````

---

#### `GET /api/applications/:id` — جلب استمارة واحدة

> **أدمن فقط.**

**Response `200` ✅**
```json
{
  "message": "تم جلب الاستمارة بنجاح",
  "data": {
    "id": "cmw9746rq0002uo2x...",
    "name": "Ahmed Mohamed",
    "currentChallenges": "...",
    "courseGoal": "...",
    "createdAt": "2026-11-09T12:00:00.000Z",
    "user": {
      "id": "...",
      "name": "Ahmed Mohamed",
      "email": "ahmed@example.com"
    }
  }
}
```

````carousel
**fetch**
```js
const res = await api("/api/applications/cmw9746rq0002uo2x...");
const data = await res.json();
```
<!-- slide -->
**axios**
```js
const { data } = await api.get(`/api/applications/${id}`);
```
````

---

## ثالثاً: جدول كل الـ Endpoints

| Method | Endpoint | الوصف | الصلاحية |
|--------|----------|-------|----------|
| `POST` | `/api/auth/register` | تسجيل يوزر | عام |
| `POST` | `/api/auth/login` | دخول يوزر | عام |
| `POST` | `/api/auth/admin/login` | دخول أدمن | عام |
| `POST` | `/api/auth/logout` | خروج | مسجل دخول |
| `POST` | `/api/applications` | تقديم استمارة | مسجل دخول |
| `GET` | `/api/applications` | كل الاستمارات | أدمن فقط |
| `GET` | `/api/applications/:id` | استمارة واحدة | أدمن فقط |

---

## رابعاً: كودات الأخطاء

| Status | المعنى |
|--------|--------|
| `200` | نجح الطلب |
| `201` | تم الإنشاء |
| `400` | بيانات ناقصة أو غلط |
| `401` | مسجلش دخول / الجلسة انتهت |
| `403` | مش عندك صلاحية |
| `404` | مش موجود |
| `409` | موجود بالفعل (إيميل / استمارة) |
| `500` | خطأ في السيرفر |

---

## خامساً: نصائح للـ Frontend

> [!IMPORTANT]
> لازم كل request فيها `credentials: "include"` (fetch) أو `withCredentials: true` (axios) — من غيرها الكوكي مش هتتبعت ومش هيعرف مين اللي بيكلم السيرفر.

> [!TIP]
> بعد الـ login خزّن بيانات الـ user (name, role) في الـ state (Zustand / Redux / Context) — وبالـ `role` تعرف تعمل حماية للصفحات (User Dashboard vs Admin Dashboard).

> [!NOTE]
> لو الـ Frontend على domain مختلف عن الـ Backend (مثلاً `localhost:5173` و `localhost:3000`)، اضيف للـ Backend:
> ```js
> app.use(cors({
>   origin: "http://localhost:5173",
>   credentials: true,
> }));
> ```
> وإلا الكوكيز مش هتشتغل بسبب CORS.
