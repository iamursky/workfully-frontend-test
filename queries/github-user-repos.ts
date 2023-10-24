import type { AxiosApiError } from "@/types/api";
import type { IGitHubUserRepository } from "@/types/github";

import { gitHubAxiosInstance } from "@/lib/github-axios-instance";
import useSWR from "swr";

export function useGitHubUserRepos(username: string, shouldFetch: (username: string) => boolean) {
  return useSWR<IGitHubUserRepository[], AxiosApiError>(
    shouldFetch(username) ? createGitHubUserReposApiUrl(username) : null,
    (url) => gitHubAxiosInstance.get(url).then((res) => res.data),
    { refreshInterval: 0, errorRetryCount: 0 },
  );
}

export function createGitHubUserReposApiUrl(username: string) {
  return `/github/users/${username}/repos`;
}
