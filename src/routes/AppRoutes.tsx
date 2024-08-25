import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Profile from '@/pages/Profile'
import About from '@/pages/About'
import MainLayout from '@/layout/main'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Business from '@/pages/Business'
import Register from '@/pages/Register'
import PrivateRoutes from './PrivateRoutes'

function AppRoutes(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/business" element={<Business />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
