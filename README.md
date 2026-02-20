# MERN E-Commerce Platform (Production-Ready Scaffold)

A modular MERN stack e-commerce application with JWT auth, refresh tokens, Razorpay checkout, Cloudinary uploads, Redux Toolkit state management, and Tailwind CSS UI.

## 1) Complete Folder Structure

```text
.
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── features
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   └── services
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 2) Backend Architecture (Step-by-step)

1. **Configuration Layer**
   - `config/db.js`: MongoDB connection.
   - `config/razorpay.js`: Razorpay SDK setup.
   - `config/cloudinary.js`: image hosting configuration.

2. **Domain Models**
   - `User`: auth, roles, wishlist, refresh token.
   - `Product`: catalog, inventory, reviews, rating aggregate.
   - `Category`: taxonomy.
   - `Order`: checkout/payment/order tracking lifecycle.
   - `Cart`: database cart storage.

3. **Middleware**
   - `protect` + `adminOnly`: auth + RBAC.
   - Validation middleware using `express-validator`.
   - Global error middleware + not-found middleware.

4. **Controllers**
   - Auth: register/login/logout/refresh/get profile.
   - Products: CRUD + reviews + search/filter/pagination.
   - Categories: CRUD.
   - Cart: add/remove/list/update item quantities.
   - Orders: create Razorpay checkout session, verify payment, list/update orders.
   - Uploads: Cloudinary image upload endpoint.

5. **Routes and API Design**
   - `/api/auth`, `/api/products`, `/api/categories`, `/api/cart`, `/api/orders`, `/api/upload`
   - Route-level validation and role checks for secure entry points.

6. **Security and Production Readiness**
   - Helmet, CORS, HTTP-only cookies, bcrypt hashing, centralized error responses.

## 3) Frontend Architecture (Step-by-step)

1. **Bootstrapping**
   - Vite + React + Tailwind + Redux store provider.
2. **Layouts and Routing**
   - Main layout with responsive navbar.
   - Public + protected + admin routes.
3. **State Management**
   - Redux Toolkit slices:
     - `authSlice` for auth flows.
     - `productSlice` for catalog/search.
     - `cartSlice` for local cart state.
     - `uiSlice` for dark mode.
4. **Pages**
   - Home, Product Details, Auth, Cart, Checkout, Order Success, Profile.
   - Admin Dashboard, Admin Product Management, Admin Orders Management.
5. **Services Layer**
   - Axios abstraction per domain: auth/product/order.

## 4) Environment Variables

### Backend (`backend/.env` from `.env.example`)
- DB: `MONGO_URI`
- Auth: `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
- Razorpay: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- Cloudinary: `CLOUDINARY_*`
- Mail: `SMTP_*`
- CORS: `CLIENT_URL`

### Frontend (`frontend/.env` from `.env.example`)
- `VITE_API_URL`

- Razorpay config errors such as `key_id or oauthToken is mandatory` mean backend env vars are missing; set both `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` before starting the API.

## 5) How to Run Locally

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 6) Deployment Guide (Render + Vercel)

### Backend on Render
1. Create a new Web Service.
2. Root Directory: `backend`.
3. Build Command: `npm install`.
4. Start Command: `npm start`.
5. Add all backend environment variables in Render dashboard.
6. Add MongoDB Atlas connection string.

### Frontend on Vercel
1. Import repository in Vercel.
2. Root Directory: `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add `VITE_API_URL` pointing to Render backend URL.

## 7) Database Schema Explanation

- **User 1:N Orders**: each order belongs to one user.
- **Category 1:N Products**: each product belongs to one category.
- **Product 1:N Reviews**: embedded review docs with user ref for accountability.
- **User 1:1 Cart**: one cart document per user with product references.
- **Order Items** snapshot product name/price at purchase time for historical integrity.

## Bonus Features Included in Scaffold
- Wishlist field on user model.
- Product reviews and ratings.
- Order tracking statuses.
- Admin analytics dashboard UI stub.
- Dark mode toggle.
- Email notification hook for order confirmation.

---

## Notes
This is a clean, scalable foundation designed for production extension. Add integration tests, webhook signature verification for Stripe, refresh-token rotation, and stricter schema policies before launch.
