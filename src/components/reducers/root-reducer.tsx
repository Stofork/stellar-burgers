import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSliceReducer } from '../../slices/ingredients-slice/ingredients-slice';
import { burgerConstructorSliceReducer } from '../../slices/burger-constructor-slice/burger-constructor-slice';
import { userSliceReducer } from '../../slices/user-slice/user-slice';
import { ordersSliceReducer } from '../../slices/orders-slice/orders-slice';
import { orderSliceReducer } from '../../slices/order-slice/order-slice';

// Возвращаем созданные редюсеры
export const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
  user: userSliceReducer,
  ordersFeed: ordersSliceReducer,
  order: orderSliceReducer
});
