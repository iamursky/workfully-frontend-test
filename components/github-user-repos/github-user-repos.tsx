import { useDebounce } from "@/hooks/debounce";
import { useGitHubUserRepos } from "@/queries/github-user-repos";
import { UnderlineNav } from "@primer/react/drafts";

import { RepoIcon } from "@primer/octicons-react";
import { GitHubUserReposComponent } from "./github-user-repos.component";
import { GitHubUserReposLoading } from "./github-user-repos.loading";

export interface IGitHubUserReposProps {
  username: string;
}

export function GitHubUserRepos({ username }: IGitHubUserReposProps) {
  const debouncedUsername = useDebounce(username, 500);

  const { data, isLoading } = useGitHubUserRepos(
    debouncedUsername,
    (username) => username.length > 0,
  );

  return (
    <div className="w-full">
      {data || isLoading ? (
        <UnderlineNav aria-label="GitHub user">
          <UnderlineNav.Item aria-current="page" icon={RepoIcon}>
            Repositories
          </UnderlineNav.Item>
        </UnderlineNav>
      ) : null}

      {isLoading ? <GitHubUserReposLoading /> : null}
      {data ? <GitHubUserReposComponent repos={data} /> : null}
    </div>
  );
}
