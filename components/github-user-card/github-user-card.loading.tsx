import { Spinner } from "@primer/react";

export function GitHubUserCardLoading() {
  return (
    <div className="my-4 flex justify-center" data-cy="github-user-card.loading">
      <Spinner />
    </div>
  );
}
