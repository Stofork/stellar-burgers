import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

jest.mock('../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn(),
}));

describe('getIngredientsApi', () => {
  it('должен вернуть массив ингредиентов', async () => {
    const mockIngredients: TIngredient[] = [
      {
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
      },
      {
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
      },
    ];

    (getIngredientsApi as jest.Mock).mockResolvedValueOnce(mockIngredients);

    const ingredients = await getIngredientsApi();
    expect(ingredients).toEqual(mockIngredients);
    expect(getIngredientsApi).toHaveBeenCalled();
  });

  it('должен выбросить ошибку', async () => {
    (getIngredientsApi as jest.Mock).mockRejectedValueOnce(new Error('Ошибка'));

    await expect(getIngredientsApi()).rejects.toThrow('Ошибка');
  });
});