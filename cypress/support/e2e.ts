import './commands';

// Игнорируем необработанные исключения приложения, чтобы тесты не падали из-за системных ошибок Next.js
Cypress.on('uncaught:exception', (err, runnable) => {
  // возвращение false предотвращает падение теста
  return false;
});
