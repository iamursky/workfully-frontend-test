import type { AxiosApiError } from "@/types/api";

import { Flash } from "@primer/react";

export interface IGitHubUserCardErrorProps {
  error: AxiosApiError;
}

export function GitHubUserCardError({ error }: IGitHubUserCardErrorProps) {
  return (
    <Flash variant="danger" data-cy="github-user-card.error">
      {error.response?.status === 404 ? "User not found" : "Failed to get user info"}
    </Flash>
  );
}
