import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUserSelectors } from '../../slices/user-slice/user-slice';

type TProtectedRoute = {
  forAuthorizedUsers?: boolean;
};

export const ProtectedRoute = ({
  forAuthorizedUsers = false
}: TProtectedRoute) => {
  // Проверка маршрута
  const location = useLocation();
  const from = location.state?.from || '/';
  const { isAuthorization } = useSelector(getUserSelectors);

  // Проверка авторизации пользователя
  if (!forAuthorizedUsers && isAuthorization) {
    return <Navigate replace to={from} state={{ from: location }} />;
  }

  // Проверка авторизации пользователя
  if (forAuthorizedUsers && !isAuthorization) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
