import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersFeed,
  getOrdersSelectors
} from '../../slices/orders-slice/orders-slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const { feed } = useSelector(getOrdersSelectors);
  const orders: TOrder[] = feed;
  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(getOrdersFeed());
  };

  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
