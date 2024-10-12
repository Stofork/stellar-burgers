import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructor = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: []
};

// Слайс конструктора бургера
export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // Добавление ингредиента
    addIngredient: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      }),

      reducer: (
        state: TBurgerConstructor,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    // Удаление ингердиента
    deleteIngredient: (
      state: TBurgerConstructor,
      action: PayloadAction<string>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    // Перемешение ингредиента наверх
    moveUpIngredient: (
      state: TBurgerConstructor,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      if (ingredientIndex > 0) {
        state.ingredients[ingredientIndex] =
          state.ingredients[ingredientIndex - 1];
        state.ingredients[ingredientIndex - 1] = action.payload;
      }
    },
    // Перемешение ингредиента вниз
    moveDownIngredient: (
      state: TBurgerConstructor,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );

      if (ingredientIndex < state.ingredients.length) {
        state.ingredients[ingredientIndex] =
          state.ingredients[ingredientIndex + 1];
        state.ingredients[ingredientIndex + 1] = action.payload;
      }
    },
    // Сброс выбранных ингредиентов
    resetConstructor: (state: TBurgerConstructor) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructor: (state: TBurgerConstructor) => state
  }
});

export const { getConstructor } = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;
export const burgerConstructorSliceReducer = burgerConstructorSlice.reducer;
