import gitHubUserReposFixture from "@/cypress/fixtures/github-user-repos.json";
import gitHubUserFixture from "@/cypress/fixtures/github-user.json";
import { createGitHubUserApiUrl } from "@/queries/github-user";
import { createGitHubUserReposApiUrl } from "@/queries/github-user-repos";

describe("GitHub User Search", () => {
  it("should render the component", () => {
    cy.intercept("GET", createGitHubUserApiUrl(gitHubUserFixture.username), {
      fixture: "github-user.json",
    });

    cy.intercept("GET", createGitHubUserReposApiUrl(gitHubUserFixture.username), {
      fixture: "github-user-repos.json",
    });

    cy.visit("/");

    // Search user
    cy.get("[data-cy=github-user-search-form]").should("be.visible");
    cy.get("[data-cy=github-user-search-form__username-input]").type(gitHubUserFixture.username);
    cy.get("[data-cy=github-user-search-form__submit-button]").click();

    // Check user info
    cy.get("[data-cy=github-user-card]").should("be.visible");
    cy.get("[data-cy=github-user-card__name]").contains(gitHubUserFixture.name);
    cy.get("[data-cy=github-user-card__username]").contains(gitHubUserFixture.username);
    cy.get("[data-cy=github-user-card__bio]").contains(gitHubUserFixture.bio);

    // Check user repos
    cy.get("[data-cy=github-user-repos]").should("be.visible");
    cy.get("[data-cy=github-user-repo__name]").contains(gitHubUserReposFixture[0].name);
    cy.get("[data-cy=github-user-repo__stars]").contains(gitHubUserReposFixture[0].stars);
    cy.get("[data-cy=github-user-repo__forks]").contains(gitHubUserReposFixture[0].forks);
  });
});
