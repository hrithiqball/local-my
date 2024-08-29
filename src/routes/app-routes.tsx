import MainLayout from '@/layout/main-layout'
import AboutPage from '@/pages/about-page'
import LoginPage from '@/pages/auth/login-page'
import RegisterPage from '@/pages/auth/register-page'
import BasePage from '@/pages/base-page'
import BusinessListPage from '@/pages/business/business-list-page'
// import CreateBusinessPage from '@/pages/business/create-business-page'
import CurrentUserBusinessPage from '@/pages/business/current-business-page'
import HomePage from '@/pages/home-page'
import NotFoundPage from '@/pages/not-found-page'
import ProfilePage from '@/pages/profile-page'
import PrivateRoutes from '@/routes/private-route'
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
            {/* <Route path="create" element={<CreateBusinessPage />} /> */}
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
