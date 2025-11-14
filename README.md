# XYZ Innovations - Landing Page & Admin Dashboard

A modern, animation-rich landing page and admin dashboard built with React, Vite, and Framer Motion.

## Features

### Landing Page
- ✨ Smooth animations with Framer Motion
- 🎨 Modern design with gradient effects
- 📱 Fully responsive layout
- 🌙 Dark/Light theme toggle
- 📝 Contact form with validation
- 🎠 Testimonial carousel
- ⚙️ CMS-driven services section
- 💫 Floating animations and hover effects

### Admin Dashboard
- 🔐 Simple authentication (Demo: admin@xyz.com / admin123)
- ⚙️ Full CRUD operations for services
- 📧 Message management and viewer
- 📊 Dashboard with statistics
- 🌐 Real-time updates across pages
- 💾 localStorage persistence

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Storage**: localStorage (frontend only)

## Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Build for production:
\`\`\`bash
npm run build
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── landing/
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── admin/
│   │   ├── AdminSidebar.jsx
│   │   ├── AdminHome.jsx
│   │   ├── ServicesManagement.jsx
│   │   └── MessagesViewer.jsx
│   └── PrivateRoute.jsx
├── context/
│   ├── DataContext.jsx
│   └── ThemeContext.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── AdminLogin.jsx
│   └── AdminDashboard.jsx
├── App.jsx
├── main.jsx
└── index.css
\`\`\`

## Key Features Explained

### State Management
- Uses React Context API for global state
- localStorage for data persistence
- No external state management library needed

### Services Management
- Create, read, update, delete services
- Each service displays on landing page in real-time
- Simple form validation

### Contact Form
- Email validation
- Real-time form submission
- Messages stored in localStorage
- Admin panel displays all messages

### Animations
- Page transitions with Framer Motion
- Hover effects on cards and buttons
- Smooth scroll animations
- Floating blob backgrounds
- Staggered container animations

## Demo Credentials

- **Email**: admin@xyz.com
- **Password**: admin123

## Customization

### Add More Testimonials
Edit `src/context/DataContext.jsx` and add to `defaultTestimonials`

### Change Color Scheme
Update CSS variables in `src/index.css`:
\`\`\`css
:root {
  --primary: #0f172a;
  --secondary: #7c3aed;
  --accent: #ec4899;
  /* ... */
}
\`\`\`

### Modify Services
Add/edit/delete services through the admin dashboard

## Performance Features

- Lazy loading with Vite code splitting
- Efficient Framer Motion animations
- Optimized re-renders with React
