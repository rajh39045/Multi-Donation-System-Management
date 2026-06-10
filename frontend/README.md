# Multi-Donation System - Frontend

This frontend is the current working UI for the Multi Donation System. It is verified to build successfully with the current workspace setup.

## Current setup
- React 18 + Vite
- Tailwind CSS
- React Query for data fetching
- Zustand for auth state
- React Hook Form + Yup for forms
- Lucide icons and reusable glassmorphism UI components

## Run locally
1. Go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or update `.env` if needed. The app expects the backend on:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

## Main areas
```text
frontend/src/
  components/   # Shared UI and forms
  hooks/        # Auth, toast, GSAP hooks
  pages/        # Donor, organization, volunteer, admin pages
  services/     # API integration
  store/        # Zustand stores
  utils/        # Formatters and validators
```

## Notes
- The frontend is wired to the backend at `http://localhost:5001/api`.
- The current project version works with the local development setup and builds successfully with Vite.
