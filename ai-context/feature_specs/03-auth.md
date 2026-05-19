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
  - **User menu** (email display, sign out)

---

## 👤 User Menu Spec

### Trigger
- Displayed in the Header **only when authenticated**
- Shown as an **avatar button** containing the user's email initial (e.g. `J` for `john@example.com`)
- Accent colour background (`#F97316`), white text

### Dropdown Contents
| Section | Content |
|---|---|
| Info header | "Signed in as" label + user email (truncated) |
| Action | Sign out (with loading state: "Signing out…") |

### Behaviour
- Opens/closes on avatar click
- Closes on click outside the menu
- Closes on `Escape` key
- Sign out calls `supabase.auth.signOut()` then closes dropdown
- After sign out: middleware clears session cookie, `onAuthStateChange` updates context, Header returns to unauthenticated state

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
- [x] Logout clears session  

### UI / UX
- [ ] Modal matches theme  
- [x] Modal opens from navbar  
- [x] Modal opens on protected actions  
- [x] Full `/signin` and `/signup` pages exist
- [x] User menu dropdown with email + sign out visible when authenticated
- [x] Credits display hidden for unauthenticated users  

### Routing
- [ ] Non-auth users can browse homepage  
- [ ] Non-auth users cannot see credits  
- [ ] Protected routes trigger modal  
- [ ] `/signin` and `/signup` behave correctly  
- [ ] Auth users always land on `/`  

---

