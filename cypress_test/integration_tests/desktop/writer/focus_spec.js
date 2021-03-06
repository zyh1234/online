/* global describe it cy beforeEach require afterEach */

var helper = require('../../common/helper');

describe('Focus tests', function() {
	var testFileName = 'focus.odt';

	beforeEach(function() {
		helper.beforeAll(testFileName, 'writer');
	});

	afterEach(function() {
		helper.afterAll(testFileName);
	});

	it('Basic document focus.', function() {
		// Document has the focus after load
		cy.document().its('activeElement.className')
			.should('be.eq', 'clipboard');
	});

	it('Search for non existing word.', function() {
		// Move focus to the search field
		cy.get('#search-input')
			.click();

		cy.document().its('activeElement.id')
			.should('be.eq', 'search-input');

		var text = 'qqqqq';
		helper.typeText('body', text, 100);

		// Search field still has the focus.
		cy.document().its('activeElement.id')
			.should('be.eq', 'search-input');

		cy.get('#search-input')
			.should('have.prop', 'value', text);
	});

	it('Search for existing word (with bold font).', function() {
		// Move focus to the search field
		cy.get('#search-input')
			.click();

		cy.document().its('activeElement.id')
			.should('be.eq', 'search-input');

		var text = 'text';
		helper.typeText('body', text, 100);

		// Search field still has the focus.
		cy.document().its('activeElement.id')
			.should('be.eq', 'search-input');

		cy.get('#search-input')
			.should('have.prop', 'value', text);
	});

	it('Search for existing word (in table).', function() {
		// Move focus to the search field
		cy.get('#search-input')
			.click();

		cy.document().its('activeElement.id')
			.should('be.eq', 'search-input');

		var text = 'word';
		helper.typeText('body', text, 200);

		// Search field still has the focus.
		// We have a focus issue here.
		cy.document().its('activeElement.id')
			.should('be.eq', 'search-input');

		cy.get('#search-input')
			.should('have.prop', 'value', text);
	});
});
