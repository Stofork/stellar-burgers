const addButton = 'Добавить';
const testNubmer = '1111';

Cypress.Commands.add('openModal', () => {
  const bun = cy.get('[data-cy=bun]');
  bun.click();
});

Cypress.Commands.add('getModal', () => {
  return cy.get('[data-cy=modal]');
});

Cypress.Commands.add('getBun', () => {
  return cy.get('[data-cy=bun]');
});

Cypress.Commands.add('getMainIngredient', () => {
  return cy.get('[data-cy=main]');
});

Cypress.Commands.add('getSauce', () => {
  return cy.get('[data-cy=sauce]');
});

Cypress.Commands.add('getOverlay', () => {
  return cy.get('[data-cy=overlay]');
});

Cypress.Commands.add('addCookie', () => {
  cy.setCookie('accessToken', 'testToken');
});

Cypress.Commands.add('addRefreshToken', () => {
  localStorage.setItem('refreshToken', 'refreshToken');
});

beforeEach(() => {
  cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients' }).as(
    'ingredients'
  );
  cy.intercept('GET', `api/auth/user`, { fixture: 'user' }).as('user');
  cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('order');
  cy.visit('/');
});

describe('Тест конструктора', () => {
  it('Добавление ингредиентов в бургер', () => {
    cy.getBun().contains(addButton).click();
    cy.getMainIngredient().contains(addButton).click();
    cy.getSauce().contains(addButton).click();

    const topBun = cy.get('[data-cy=top-bun]');
    const bottomBun = cy.get('[data-cy=bottom-bun]');
    const ingredient = cy.get('[data-cy=ingredient-constructor]');

    topBun.should('exist');
    bottomBun.should('exist');
    ingredient.should('exist');
  });
});

describe('Тест модальных окон', () => {
  it('Открытие модального окна', () => {
    cy.openModal();
    cy.getModal().should('exist');
    cy.getModal().contains('Test bun').should('exist');
  });

  it('Закрытие модального по клику на кнопку', () => {
    cy.openModal();
    const modal = cy.getModal();
    const closeModalBtn = cy.get('[data-cy=close-modal]');

    closeModalBtn.click();
    modal.should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.openModal();
    cy.getModal().invoke('hide');

    cy.getOverlay().click();
    cy.getModal().should('not.exist');
  });
});

describe('Тест оформления заказа', () => {
  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Создание заказа', () => {
    cy.addCookie();
    cy.addRefreshToken();

    cy.getBun().contains(addButton).click();
    cy.getMainIngredient().contains(addButton).click();
    cy.getSauce().contains(addButton).click();

    cy.get('[type = button]').contains('Оформить заказ').click();
    cy.getModal().contains(testNubmer).should('exist');
    cy.getModal().invoke('hide');
    cy.getOverlay().click();
    cy.getModal().should('not.exist');

    cy.get('[data-cy=top-bun-empty]').should('exist');
    cy.get('[data-cy=empty-ingredient]').should('exist');
    cy.get('[data-cy=bottom-bun-empty]').should('exist');
  });
});
