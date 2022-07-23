import { Routes, Route, Outlet } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        <Route path='dashboard' element={<div>DASHBOARD</div>} />
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<>NotFound</>} />
      </Route>
    </Routes>)
};
