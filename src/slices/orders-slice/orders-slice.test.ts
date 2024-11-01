import { ordersSlice, getOrdersFeed, getOrders } from './orders-slice';
import { TOrder } from '@utils-types';

const { reducer } = ordersSlice;

describe('ordersSlice', () => {
  const initialState = {
    orders: [],
    feed: [],
    isLoading: false,
    errors: undefined,
    total: 0,
    totalToday: 0,
  };

  it('должен иметь начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });
  it('должен обрабатывать getOrdersFeed.pending', () => {
    const action = getOrdersFeed.pending('requestId', undefined);
    const newState = reducer(initialState, action);
    
    expect(newState.isLoading).toBe(true);
    expect(newState.errors).toBeUndefined();
  });

  it('должен обрабатывать getOrdersFeed.rejected', () => {
    const action = getOrdersFeed.rejected(new Error('Ошибка получения фида'), 'requestId', undefined);
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.errors).toEqual('Ошибка получения фида');
  });

  it('должен обрабатывать getOrdersFeed.fulfilled', () => {
    const mockFeed: TOrder[] = [
      { _id: '1', status: 'pending', name: 'Заказ 1', createdAt: '2024-11-01T01:00:00.000Z', updatedAt: '2024-11-01T01:00:00.000Z', number: 1, ingredients: ['ingredientId1'] },
      { _id: '2', status: 'done', name: 'Заказ 2', createdAt: '2024-11-01T01:00:00.000Z', updatedAt: '2024-11-01T01:00:00.000Z', number: 2, ingredients: ['ingredientId2'] },
    ];
  
    const action = getOrdersFeed.fulfilled(
      { success: true, orders: mockFeed, total: 2, totalToday: 1 },
      'requestId',
      undefined
    );
    
    const newState = reducer(initialState, action);
  
    expect(newState.feed).toEqual(mockFeed);
    expect(newState.total).toBe(2);
    expect(newState.totalToday).toBe(1);
    expect(newState.isLoading).toBe(false);
  });

  it('должен обрабатывать getOrders.pending', () => {
    const action = getOrders.pending('requestId', undefined);
    const newState = reducer(initialState, action);
    
    expect(newState.isLoading).toBe(true);
  });

  it('должен обрабатывать getOrders.rejected', () => {
    const action = getOrders.rejected(new Error('Ошибка получения заказов'), 'requestId', undefined);
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.errors).toEqual('Ошибка получения заказов');
  });

  it('должен обрабатывать getOrders.fulfilled', () => {
    const mockOrders: TOrder[] = [
      { _id: '3', status: 'pending', name: 'Заказ 3', createdAt: '2024-11-01T01:00:00.000Z', updatedAt: '2024-11-01T01:00:00.000Z', number: 3, ingredients: ['ingredientId3'] },
    ];

    const action = getOrders.fulfilled(mockOrders, 'requestId', undefined);
    const newState = reducer(initialState, action);

    expect(newState.orders).toEqual(mockOrders);
    expect(newState.isLoading).toBe(false);
  });
});