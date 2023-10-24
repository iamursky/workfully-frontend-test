import type { IGitHubUserRepository } from "@/types/github";

import { RepoForkedIcon, StarIcon } from "@primer/octicons-react";
import { ActionList, Text } from "@primer/react";

export interface IGitHubUserReposComponentProps {
  repos: IGitHubUserRepository[];
}

export function GitHubUserReposComponent({ repos }: IGitHubUserReposComponentProps) {
  return (
    <ActionList className="h-full overflow-y-auto" data-cy="github-user-repos">
      {repos.length ? (
        repos.map((repo) => (
          <ActionList.Item as="a" href={repo.url} key={repo.id} data-cy="github-user-repo">
            <Text data-cy="github-user-repo__name" className="font-semibold">
              {repo.name}
            </Text>
            <ActionList.TrailingVisual>
              <Text data-cy="github-user-repo__stars">
                <StarIcon /> {repo.stars || 0}
              </Text>

              <Text className="ml-4" data-cy="github-user-repo__forks">
                <RepoForkedIcon /> {repo.forks || 0}
              </Text>
            </ActionList.TrailingVisual>
          </ActionList.Item>
        ))
      ) : (
        <ActionList.Item>
          <Text>User don&apos;t have repositories</Text>
        </ActionList.Item>
      )}
    </ActionList>
  );
}
