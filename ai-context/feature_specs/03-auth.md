## 🔐 Authentication Spec (Next.js + Supabase)

### Auth Methods
- **Magic link**  
- **Google OAuth**  

Supabase manages sessions, refresh tokens, and user metadata.

---

## 🎨 UI / UX Requirements

### Theme
- Use the **existing app theme** for modal, buttons, inputs, spacing, typography.

### Auth Modal
- Opens for:
  - Navbar **Sign in**
  - Any **protected action**
- Contains:
  - **Sign In** / **Sign Up** toggle
  - **Google login**
  - **Magic link email input**
  - “Check your email” confirmation state

---

## 🧭 Routing & Redirect Rules

### Non‑Authenticated Users
- Can view:
  - **Home page (`/`)**
- Cannot:
  - See **credit balance**
  - Access **protected features**
- If they try:
  - **Open auth modal**, stay on same page

### Authenticated Users
- After login → **redirect to `/`**
- Can see:
  - **Credit balance**
  - **User menu** (profile, logout)

---

## 🆕 Additional Rule (Your Request)

### Visiting `/signin` or `/signup` While **Not Logged In**
- Should **render the full sign‑in or sign‑up page**, NOT the modal  
- These pages are **dedicated auth pages**, separate from modal usage  
- They should:
  - Match the theme  
  - Contain the same auth options (Google + Magic Link)  
  - Redirect authenticated users to `/`  

### Visiting `/signin` or `/signup` While **Logged In**
- Redirect to `/`

---

## 🔁 Full Redirect Matrix

| Scenario | Behavior |
|---------|----------|
| User logs in | Redirect to `/` |
| User logs out | Redirect to `/` |
| User visits `/signin` or `/signup` **while logged in** | Redirect to `/` |
| User visits `/signin` or `/signup` **while NOT logged in** | Show full auth page |
| User hits protected route without session | Stay on page → open modal |
| User clicks “Sign in” in navbar | Open modal |

---

## 🛡️ Protected Route Logic

### Server Components (RSC)
- Use Supabase server client to check session
- If **no session**:
  - Return `{ requiresAuth: true }`  
  - Client opens modal  
  - Do **not** redirect unless user is on `/signin` or `/signup`

### Client Components
- Protected button clicked:
  - If **no session** → open modal  
  - If **session exists** → continue action  

---

## 🧪 Completion Checklist

### Authentication
- [ ] Magic link works  
- [ ] Google OAuth works  
- [ ] Session persists  
- [ ] Logout clears session  

### UI / UX
- [ ] Modal matches theme  
- [ ] Modal opens from navbar  
- [ ] Modal opens on protected actions  
- [ ] Full `/signin` and `/signup` pages exist  

### Routing
- [ ] Non-auth users can browse homepage  
- [ ] Non-auth users cannot see credits  
- [ ] Protected routes trigger modal  
- [ ] `/signin` and `/signup` behave correctly  
- [ ] Auth users always land on `/`  

---

