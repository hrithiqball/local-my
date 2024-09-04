import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import MainLayout from '@/layout/main-layout'
import LoadingPage from '@/pages/loading-page'
import PrivateRoutes from '@/routes/private-route'

const AboutPage = lazy(() => import('@/pages/about-page'))
const HomePage = lazy(() => import('@/pages/home-page'))
const NotFoundPage = lazy(() => import('@/pages/not-found-page'))

const LoginPage = lazy(() => import('@/pages/auth/login-page'))
const RegisterPage = lazy(() => import('@/pages/auth/register-page'))

const ProfilePage = lazy(() => import('@/pages/profile-page'))

const BusinessListPage = lazy(() => import('@/pages/business/business-list-page'))

const BasePage = lazy(() => import('@/pages/base-page'))
const CurrentUserBusinessPage = lazy(() => import('@/pages/business/current-business-page'))
const UpdateBusinessPage = lazy(() => import('@/pages/business/update-business-page'))

function AppRoutes(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<LoadingPage lazy />}>
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

              <Route path="/business" element={<BasePage />}>
                <Route path="update/:businessId" element={<UpdateBusinessPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRoutes
