# Frontend Working Guide (React + Vite)

If you're new to this codebase, follow this guide first.

## 1) What runs in frontend

The frontend is a React app created with Vite. It:
- renders pages and components
- stores app state in Redux Toolkit
- calls backend APIs through Axios service wrappers
- handles user flows (auth, cart, checkout, profile, admin)

---

## 2) Start frontend locally

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Default URL: `http://localhost:5173`

`VITE_API_URL` in `.env` must point to backend API, usually:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 3) Folder map (what to edit and when)

- `src/main.jsx` → app bootstrap (providers, router, Redux)
- `src/App.jsx` → all app routes
- `src/layouts/` → global page shell/layout
- `src/components/` → reusable UI pieces
- `src/pages/` → route pages (business screens)
- `src/features/` → Redux slices and store
- `src/services/` → API calls to backend
- `src/hooks/` → shared custom hooks

Rule of thumb:
- UI issue? edit `components/` or `pages/`
- state issue? edit `features/*Slice.js`
- API issue? edit `services/*.js`
- navigation/route issue? edit `App.jsx`

---

## 4) How data flow works (very important)

Most screens follow this pipeline:

1. User clicks UI in a page/component.
2. Page dispatches a Redux action or directly calls a service.
3. Service (`src/services/*.js`) sends HTTP request via Axios client (`api.js`).
4. Response updates Redux state in slice reducers.
5. React re-renders with latest state.

Example (product list):
- `HomePage.jsx` dispatches `fetchProducts`
- `productSlice.js` thunk calls `productService.list`
- backend data stored in `state.products.products`
- `HomePage` maps and renders cards

---

## 5) Core flows to understand quickly

### Auth flow
- Page: `src/pages/AuthPage.jsx`
- Slice: `src/features/authSlice.js`
- Service: `src/services/authService.js`

### Product listing/details
- Pages: `HomePage.jsx`, `ProductDetailsPage.jsx`
- Slice: `productSlice.js`
- Service: `productService.js`

### Cart flow
- Page: `CartPage.jsx`
- Slice: `cartSlice.js`

### Checkout/payment
- Page: `CheckoutPage.jsx`
- Service: `orderService.js`
- Uses Razorpay script at runtime and verifies payment via backend.

---

## 6) How to add a new page feature

1. Create page file in `src/pages/`.
2. Add route in `src/App.jsx`.
3. Create service method if API call needed.
4. Create/extend slice if state should be global.
5. Connect UI with `useDispatch/useSelector`.
6. Add loading/error toasts for UX.

---

## 7) Common confusion points

- **Why page shows blank?**
  - Check browser console for component crash.
  - Check route path in `App.jsx`.

- **API call fails?**
  - Confirm backend is running.
  - Verify `VITE_API_URL` and backend CORS.
  - Inspect network tab for 401/403/500.

- **State not updating?**
  - Check reducer logic in slice.
  - Make sure thunk is dispatched.
  - Confirm selector path matches store shape.

- **Razorpay not opening?**
  - Ensure checkout script loads and backend returns `razorpay` options.
  - Ensure backend env has `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.

---

## 8) Fast debugging checklist

1. `console.log` API responses in service/thunk.
2. Check Redux state in React DevTools.
3. Check browser network tab.
4. Confirm `.env` values.
5. Validate backend endpoint manually via Postman/curl.

---

## 9) Suggested next improvements

- persist auth/cart in localStorage
- add global error boundary
- add route-level skeleton loaders
- create reusable form components + validators
- add RTK Query for standardized API state handling
