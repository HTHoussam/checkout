import '@testing-library/cypress/add-commands';

/// <reference types="cypress" />
describe('Just visit e2e test', () => {
  it('should visit', () => {
    cypress.visit('/');
  });
});
