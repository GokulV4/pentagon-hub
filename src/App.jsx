import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { PaymentProvider } from './contexts/PaymentContext'
import { AttendanceProvider } from './contexts/AttendanceContext'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Payment from './pages/Payment'
import MemberDashboard from './pages/member/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import BlogList from './pages/blog/BlogList'
import BlogManager from './pages/admin/BlogManager'
import AttendanceManager from './pages/admin/AttendanceManager'
import DebugPanel from './components/DebugPanel'
import Whistle from './pages/Whistle.jsx';


const AppContent = () => {
  const { isLoggedIn, userRole, isDebugMode } = useAuth()

  return (
    <>
      <Navigation />
      {isDebugMode && <DebugPanel />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/payment" 
          element={
            isLoggedIn ? <Payment /> : <Navigate to="/login" />
          } 
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              userRole === 'admin' || userRole === 'debug' ? <AdminDashboard /> : <MemberDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/blog" element={<BlogList />} />
        <Route 
          path="/admin/blogs" 
          element={
            isLoggedIn && (userRole === 'admin' || userRole === 'debug') ? 
              <BlogManager /> : 
              <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/members" 
          element={
            isLoggedIn && (userRole === 'admin' || userRole === 'debug') ? 
              <AdminDashboard /> : 
              <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin/attendance" 
          element={
            isLoggedIn && (userRole === 'admin' || userRole === 'debug') ? 
              <AttendanceManager /> : 
              <Navigate to="/login" />
          } 
        />
        <Route path="/whistle" element={<Whistle />} />
      </Routes>
     
    </>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <PaymentProvider>
        <AttendanceProvider>
          <Router>
            <AppContent />
          </Router>
        </AttendanceProvider>
      </PaymentProvider>
    </AuthProvider>
  )
}

export default App