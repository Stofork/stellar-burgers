import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getUserSelectors,
  registerUser
} from '../../slices/user-slice/user-slice';
import { Preloader } from '../../components/ui/preloader';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(getUserSelectors);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({ email: email, name: userName, password: password })
    ).then((res) => {
      if (res.meta.requestStatus === 'rejected') {
        return;
      } else {
        navigate('/');
      }
    });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
