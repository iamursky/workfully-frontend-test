import { useDebounce } from "@/hooks/debounce";
import { useGitHubUser } from "@/queries/github-user";
import { Fragment } from "react";

import { GitHubUserCardComponent } from "./github-user-card.component";
import { GitHubUserCardError } from "./github-user-card.error";
import { GitHubUserCardLoading } from "./github-user-card.loading";

export interface IGitHubUserCardProps {
  username: string;
}

export function GitHubUserCard({ username }: IGitHubUserCardProps) {
  const debouncedUsername = useDebounce(username, 500);

  const { data, error, isLoading } = useGitHubUser(
    debouncedUsername,
    (username) => username.length > 0,
  );

  return (
    <Fragment>
      {error ? <GitHubUserCardError error={error} /> : null}
      {isLoading ? <GitHubUserCardLoading /> : null}
      {data ? <GitHubUserCardComponent user={data} /> : null}
    </Fragment>
  );
}
