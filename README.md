# MultiDonationSystem

A modern, production-ready donation management platform designed to bridge the gap between donors, volunteers, and organizations. MultiDonationSystem provides a seamless experience for managing donations, earning credits, and claiming rewards through a visually stunning, glassmorphic interface.

## 🌟 Features

### 👤 User Roles
- **Donor:** Donate items, track donation history, and earn credits.
- **Organization:** Manage received donations, update profiles, and view impact dashboards.
- **Volunteer:** Assist in the logistics and verification of donations.
- **Admin:** Comprehensive system overview and management of organizations.

### 💰 Credit & Reward System
- Earn credits for every verified donation.
- Use credits to claim various rewards within the platform.
- Track credit history and rewards status.

### 🎨 Visual & UI
- **Glassmorphism Design:** Modern, sleek UI with frosted-glass effects.
- **GSAP Animations:** High-performance, smooth transitions and scroll-triggered animations.
- **Responsive Layout:** Fully optimized for mobile, tablet, and desktop views.
- **Interactive Dashboards:** Visualized data using Recharts for quick insights.

### 🛠️ Technical
- **RESTful API:** Robust backend architecture with Swagger documentation.
- **Secure Authentication:** JWT-based auth with refresh token support.
- **Form Validation:** Comprehensive client-side (Yup) and server-side (Joi) validation.
- **Efficient State Management:** Powered by Zustand and TanStack Query.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** [React](https://reactjs.org/) (Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Logging:** [Winston](https://github.com/winstonjs/winston)
- **Documentation:** [Swagger UI](https://swagger.io/tools/swagger-ui/)
- **Security:** Helmet, XSS-Clean, Express-Rate-Limit, BcryptJS

---

## 📁 Project Structure

```text
MultiDonationSystem/
├── backend/                # Express API
│   ├── src/
│   │   ├── config/         # DB, Logger, Swagger configs
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Auth, Error, Logger middlewares
│   │   ├── models/         # Mongoose schemas
│   │   ├── repositories/   # Data access layer
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helpers & Seeding script
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # UI, Forms, Layout components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components (Admin, Donor, Org, Public)
│   │   ├── services/       # API integration
│   │   ├── store/          # Zustand stores
│   │   └── utils/          # Formatting & Validation helpers
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/MultiDonationSystem.git
   cd MultiDonationSystem
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/multidonation
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   NODE_ENV=development
   ```
   (Optional) Seed the database:
   ```bash
   npm run seed
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend/` directory based on `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

---

## 📖 API Documentation

Once the backend is running, you can access the interactive Swagger documentation at:
`http://localhost:5000/api-docs`

---

## 📜 Available Scripts

### Backend
- `npm run dev`: Starts the server in development mode with nodemon.
- `npm start`: Starts the server in production mode.
- `npm run seed`: Seeds the database with initial data.
- `npm run format`: Formats the code using Prettier.

### Frontend
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
