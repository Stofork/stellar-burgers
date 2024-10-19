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
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
// Добавляем защищенный маршрут
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../slices/ingredients-slice/ingredients-slice';
import { getUser } from '../../slices/user-slice/user-slice';
import { Wrapper } from '../wrapper/Wrapper';

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
  const profileMatch = useMatch('/profile/orders/:id')?.params.id;
  const feedMatch = useMatch('/feed/:id')?.params.id;
  const orderNumber = profileMatch || feedMatch;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {/* Главная страница */}
        <Route path='/' element={<ConstructorPage />} />
        {/* Лента заказов */}
        <Route
          path='/feed/:id'
          element={
            <Wrapper title={`#${orderNumber}`}>
              <OrderInfo />
            </Wrapper>
          }
        />
        <Route path='/feed' element={<Feed />} />
        {/* Ингредиенты по их ID */}
        <Route
          path='/ingredients/:id'
          element={
            <Wrapper title={'Детали ингредиента'}>
              <IngredientDetails />
            </Wrapper>
          }
        />
        {/* Маршрут если есть регистрация */}
        <Route element={<ProtectedRoute forAuthorizedUsers />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:id'
            element={
              <Wrapper title={`#${orderNumber}`}>
                <OrderInfo />
              </Wrapper>
            }
          />
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
              path='/feed/:id'
              element={
                <Modal title={`#${orderNumber}`} onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route element={<ProtectedRoute forAuthorizedUsers />}>
              <Route
                path='/profile/orders/:id'
                element={
                  <Modal title={`#${orderNumber}`} onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Route>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClose={closeModal}>
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
