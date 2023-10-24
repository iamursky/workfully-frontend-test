export interface IGitHubUser {
  id: number;
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
}

export interface IGitHubUserRepository {
  id: number;
  name: string;
  stars: number | undefined;
  forks: number | undefined;
  url: string;
}
