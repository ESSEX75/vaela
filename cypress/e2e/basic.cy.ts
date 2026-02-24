/// <reference types="cypress" />

describe('Базовые тесты (Smoke Tests)', () => {
  it('должен загружать главную страницу (en)', () => {
    cy.visit('/');
    cy.url().should('include', '/en');
    cy.get('header').should('be.visible');
    // Проверка наличия ссылки на вход (signin) для текущей локали
    cy.get('a[href$="/signin"]').should('exist');
  });

  it('должен загружать главную страницу (ru)', () => {
    cy.visit('/ru');
    cy.url().should('include', '/ru');
    cy.get('header').should('be.visible');
  });

  it('должен переходить в раздел мужской одежды (Men)', () => {
    cy.visit('/en/men');
    // Проверка, что URL содержит правильный путь
    cy.url().should('include', '/en/men');
    // Проверка наличия основного контента (тега main)
    cy.get('main').should('exist');
  });
});
