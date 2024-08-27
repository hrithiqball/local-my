import MainLayout from '@/layout/MainLayout'
import AboutPage from '@/pages/AboutPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import BasePage from '@/pages/BasePage'
import BusinessListPage from '@/pages/business/BusinessListPage'
import CurrentUserBusinessPage from '@/pages/business/CurrentUserBusiness'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProfilePage from '@/pages/ProfilePage'
import PrivateRoutes from '@/routes/PrivateRoutes'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function AppRoutes(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/business" element={<BasePage />}>
            <Route index element={<BusinessListPage />} />
            <Route path=":userId" element={<CurrentUserBusinessPage />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
