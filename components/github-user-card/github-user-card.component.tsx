import type { IGitHubUser } from "@/types/github";

import { Avatar, Text } from "@primer/react";

export interface IGitHubUserCardComponentProps {
  user: IGitHubUser;
}

export function GitHubUserCardComponent({ user }: IGitHubUserCardComponentProps) {
  const hasName = user.name && user.name.length > 0;
  const hasBio = user.bio && user.bio.length > 0;

  return (
    <div className="flex gap-4" data-cy="github-user-card">
      <div className="min-w-fit" data-cy="avatar">
        <Avatar size={96} src={user.avatarUrl} />
      </div>

      <div className="flex flex-col justify-center">
        <Text data-cy="github-user-card__name" className="text-3xl font-bold">
          {hasName ? user.name : user.username}
        </Text>

        {hasName ? (
          <Text data-cy="github-user-card__username" className="text-lg text-gray-500">
            {user.username}
          </Text>
        ) : null}

        {hasBio ? (
          <Text data-cy="github-user-card__bio" className="mt-2 text-sm">
            {user.bio}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
