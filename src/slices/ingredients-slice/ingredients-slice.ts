import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type TIngredientsSliceState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined;
};

const initialState: TIngredientsSliceState = {
  ingredients: [],
  isLoading: false,
  error: undefined
};

// Получение ингредиентов
export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/get',
  getIngredientsApi
);

// Слайс самих ингредиентов
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state: TIngredientsSliceState) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsSelector = ingredientsSlice.selectors;
export const ingredientsSliceReducer = ingredientsSlice.reducer;
