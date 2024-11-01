import { orderSlice, getOrderByNumber, createOrder, clearOrderData } from './order-slice';
import { TOrder } from '../../utils/types';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';

jest.mock('../../utils/burger-api', () => ({
  getOrderByNumberApi: jest.fn(),
  orderBurgerApi: jest.fn(),
}));

describe('orderSlice', () => {
  const initialState = {
    orderData: null,
    selectedOrder: null,
    isLoading: false,
    error: undefined,
  };

  it('должен иметь начальное состояние', () => {
    const { reducer } = orderSlice;
    expect(reducer(undefined, { type: 'INIT' })).toEqual(initialState);
  });

  describe('async actions', () => {
    it('должен обрабатывать getOrderByNumber.pending', () => {
      const { reducer } = orderSlice;
      const action = getOrderByNumber.pending.type;
      const newState = reducer(initialState, { type: action });
      
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeUndefined();
    });

    it('должен обрабатывать getOrderByNumber.fulfilled', () => {
      const { reducer } = orderSlice;
      const order: TOrder = {
        _id: '1',
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2024-11-01T01:00:00.000Z',
        updatedAt: '2024-11-01T02:00:00.000Z',
        number: 42,
        ingredients: ['ingredientId1', 'ingredientId2'],
      };

      const payload = {
        success: true,
        orders: [order],
      };

      const action = getOrderByNumber.fulfilled(payload, 'requestId', 42);
      const newState = reducer(initialState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.selectedOrder).toEqual(order);
    });

    it('должен обрабатывать getOrderByNumber.rejected', () => {
        const { reducer } = orderSlice;
        const errorMessage = 'Ошибка получения заказа';
      
        const action = getOrderByNumber.rejected(
          new Error(errorMessage),
          'requestId',
          42
        );
        const newState = reducer(initialState, action);
      
        expect(newState.isLoading).toBe(false);
        expect(newState.error).toEqual(errorMessage);
      });

    it('должен обрабатывать createOrder.pending', () => {
      const { reducer } = orderSlice;
      const action = createOrder.pending.type;
      const newState = reducer(initialState, { type: action });
      
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeUndefined();
    });

    it('должен обрабатывать createOrder.fulfilled', () => {
        const { reducer } = orderSlice;
        const order: TOrder = {
          _id: '2',
          status: 'pending',
          name: 'Экзо-плантаго краторный space метеоритный бургер',
          createdAt: '2024-11-01T01:00:00.000Z',
          updatedAt: '2024-11-01T02:00:00.000Z',
          number: 43,
          ingredients: ['ingredientId3', 'ingredientId4'],
        };
      
        const response = { success: true, order, name: 'Экзо-плантаго краторный space метеоритный бургер' };
      
        (orderBurgerApi as jest.Mock).mockResolvedValueOnce(response);
      
        const action = createOrder.fulfilled(response, 'requestId', ['ingredientId3', 'ingredientId4']);
        const newState = reducer(initialState, action);
      
        expect(newState.isLoading).toBe(false);
        expect(newState.orderData).toEqual(order);
    });

    it('должен обрабатывать createOrder.rejected', () => {
    const { reducer } = orderSlice;
    const errorMessage = 'Ошибка создания заказа';
    
    const action = createOrder.rejected(new Error(errorMessage), 'requestId', ['ingredientId1', 'ingredientId2']);
    const newState = reducer(initialState, action);
    
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual(errorMessage);
    });
  });

  it('должен очищать данные заказа при вызове clearOrderData', () => {
    const { reducer } = orderSlice;
    const newState = reducer(initialState, clearOrderData());
    
    expect(newState.orderData).toBeNull();
  });
});