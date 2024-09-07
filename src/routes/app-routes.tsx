import MainLayout from '@/layout/main-layout'
import LoadingPage from '@/pages/loading-page'
import PrivateRoutes from '@/routes/private-route'
import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const AboutPage = lazy(() => import('@/pages/about-page'))
const HomePage = lazy(() => import('@/pages/home-page'))
const NotFoundPage = lazy(() => import('@/pages/not-found-page'))

const LoginPage = lazy(() => import('@/pages/auth/login-page'))
const RegisterPage = lazy(() => import('@/pages/auth/register-page'))

const ProfilePage = lazy(() => import('@/pages/profile-page'))

const BusinessPage = lazy(() => import('@/pages/business/business-page'))
const BusinessListPage = lazy(() => import('@/pages/business/business-list-page'))
const BusinessUserPage = lazy(() => import('@/pages/business/business-user-page'))
const UpdateBusinessPage = lazy(() => import('@/pages/business/update-business-page'))

const ProductCreatePage = lazy(() => import('@/pages/product/product-create-page'))
const ProductPage = lazy(() => import('@/pages/product/product-page'))

function AppRoutes(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<LoadingPage lazy />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/business">
              <Route index element={<BusinessListPage />} />
              <Route path=":businessId" element={<BusinessPage />} />
              <Route path="user/:userId" element={<BusinessUserPage />} />
            </Route>

            <Route path="/product">
              <Route path=":id" element={<ProductPage />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route path="/profile/:id" element={<ProfilePage />} />

              <Route path="/business">
                <Route path="update/:businessId" element={<UpdateBusinessPage />} />
              </Route>

              <Route path="/product">
                <Route path="create/:businessId" element={<ProductCreatePage />} />
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
