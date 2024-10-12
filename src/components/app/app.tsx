import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// Добавляем защищенный маршрут
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../slices/ingredients-slice/ingredients-slice';
import { getUser } from '../../slices/user-slice/user-slice';

const App = () => {
  // Отправка дейсвий диспетчеру
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  // Изменение текущего положения
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.background;
  // При закрытие к странице или на главную
  const closeModal = () => {
    navigate(backgroundLocation || '/');
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {/* Главная страница */}
        <Route path='/' element={<ConstructorPage />} />
        {/* Лента заказов */}
        <Route path='/feed' element={<Feed />} />
        {/* Ингредиенты по их ID */}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        {/* Маршрут если есть регистрация */}
        <Route element={<ProtectedRoute forAuthorizedUsers />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Route>
        {/* Маршруты если нету регистрации */}
        <Route element={<ProtectedRoute forAuthorizedUsers={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        {/* Маршрут страницы с ошибкой */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {/* Маршруты по конкретным ингредиентам и заказам */}
      <Routes>
        {backgroundLocation && (
          <>
            <Route
              path='/feed/:number'
              element={
                <Modal title='Заказ по номеру' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route element={<ProtectedRoute forAuthorizedUsers />}>
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal title='Заказ по номеру' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Route>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Ингредиент' onClose={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
