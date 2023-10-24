import type { AxiosApiError } from "@/types/api";
import type { IGitHubUser } from "@/types/github";

import { gitHubAxiosInstance } from "@/lib/github-axios-instance";
import useSWR from "swr";

export function useGitHubUser(username: string, shouldFetch: (username: string) => boolean) {
  return useSWR<IGitHubUser, AxiosApiError>(
    shouldFetch(username) ? createGitHubUserApiUrl(username) : null,
    (url) => gitHubAxiosInstance.get(url).then((res) => res.data),
    { refreshInterval: 0, errorRetryCount: 0 },
  );
}

export function createGitHubUserApiUrl(username: string) {
  return `/github/users/${username}`;
}
