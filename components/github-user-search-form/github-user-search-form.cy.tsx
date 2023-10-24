import { GitHubUserSearchForm } from "./github-user-search-form";

describe("<GitHubUserSearchForm />", () => {
  const handleSubmit = () => {};

  it("should render and display", () => {
    cy.mount(<GitHubUserSearchForm onSubmit={handleSubmit} />);

    // Check that the search form is visible
    cy.get("form[id='github-user-search-form']").should("be.visible");

    // Check that the search form contains the expected elements
    cy.get("form[id='github-user-search-form'] input[name='username']").should("be.visible");
    cy.get("form[id='github-user-search-form'] button[type='submit']").should("be.visible");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
