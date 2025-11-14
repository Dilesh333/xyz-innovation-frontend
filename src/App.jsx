import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { DataProvider } from "./context/DataContext"
import { ThemeProvider } from "./context/ThemeContext"
import LandingPage from "./pages/LandingPage"
import AdminDashboard from "./pages/AdminDashboard"
import AdminLogin from "./pages/AdminLogin"
import PrivateRoute from "./components/PrivateRoute"
import { Toaster } from "react-hot-toast"
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3500,
              style: { fontSize: "0.85rem" },
            }}
          />
        </Router>
      </DataProvider>
    </ThemeProvider>
  )
}

export default App
