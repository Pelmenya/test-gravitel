import { Routes, Route } from 'react-router-dom';
import { DashBoardPage } from '../../pages/dashboard-page/dashboard-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found';
import { ProtectedRoute } from './components/protected-route';

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute redirect='/login' element={<DashBoardPage />} />} />
      <Route path='dashboard' element={<ProtectedRoute redirect='/login' element={<DashBoardPage />} />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>)
};
