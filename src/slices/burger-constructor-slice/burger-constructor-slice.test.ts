import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer, {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetConstructor,
} from './burger-constructor-slice';

describe('burgerConstructorSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { burgerConstructor: burgerConstructorReducer },
    });
  });

  it('должен иметь начальное состояние', () => {
    const state = store.getState().burgerConstructor;
    expect(state).toEqual({ bun: null, ingredients: [] });
  });

  it('должен добавлять булочку', () => {
    const bun = {
      _id: '643d69a5c3f7b9001cfa093d',
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    };
    store.dispatch(addIngredient(bun));
  });

  it('должен добавлять ингредиент', () => {
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa0943',
      name: "Test sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 90,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    };
    store.dispatch(addIngredient(ingredient));
  });

  it('должен удалять ингредиент', () => {
    const ingredient1 = {
        id: '643d69a5c3f7b9001cfa0943',
        _id: '643d69a5c3f7b9001cfa0943',
        name: "Test sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    };
    const ingredient2 = {
      id: '643d69a5c3f7b9001cfa0940',
      _id: '643d69a5c3f7b9001cfa0940',
      name: "Test main ingredient",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    };
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(addIngredient(ingredient2));

    store.dispatch(deleteIngredient(ingredient1.id));

  });

  it('должен перемещать ингредиент вверх', () => {
    const ingredient1 = {
        id: '643d69a5c3f7b9001cfa0943',
        _id: '643d69a5c3f7b9001cfa0943',
        name: "Test sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    };
    const ingredient2 = {
        id: '643d69a5c3f7b9001cfa0940',
        _id: '643d69a5c3f7b9001cfa0940',
        name: "Test main ingredient",
        type: "main",
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: "https://code.s3.yandex.net/react/code/meat-04-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    };
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(addIngredient(ingredient2));

    store.dispatch(moveUpIngredient(ingredient2));
  });

  it('должен перемещать ингредиент вниз', () => {
    const ingredient1 = {
        id: '643d69a5c3f7b9001cfa0943',
        _id: '643d69a5c3f7b9001cfa0943',
        name: "Test sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    };
    const ingredient2 = {
        id: '643d69a5c3f7b9001cfa0940',
        _id: '643d69a5c3f7b9001cfa0940',
        name: "Test main ingredient",
        type: "main",
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: "https://code.s3.yandex.net/react/code/meat-04-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    };
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(addIngredient(ingredient2));

  });

  it('должен сбрасывать конструктор', () => {
    const ingredient = {
        id: '643d69a5c3f7b9001cfa0943',
        _id: '643d69a5c3f7b9001cfa0943',
        name: "Test sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    };
    store.dispatch(addIngredient(ingredient));
    store.dispatch(resetConstructor());

    const state = store.getState().burgerConstructor;
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});