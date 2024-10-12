import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '../../slices/user-slice/user-slice';

export const AppHeader: FC = () => {
  // Получаем данные пользователя
  const user = useSelector(getUserData);
  return <AppHeaderUI userName={user.name} />;
};
