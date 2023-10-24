import { GitHubUserCard } from "@/components/github-user-card";
import { GitHubUserRepos } from "@/components/github-user-repos";
import { GitHubUserSearchForm } from "@/components/github-user-search-form";
import { useState } from "react";

export default function HomePage() {
  const [username, setUsername] = useState<string>("");

  return (
    <main className="mt-32 mx-auto w-full max-w-lg">
      <GitHubUserSearchForm defaultValue={username} onSubmit={setUsername} />

      <div className="w-full mt-8 mb-4">
        <GitHubUserCard username={username} />
      </div>

      <div className="w-full mb-64">
        <GitHubUserRepos username={username} />
      </div>
    </main>
  );
}
