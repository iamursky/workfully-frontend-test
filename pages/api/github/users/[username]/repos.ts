import type { IApiError } from "@/types/api";
import type { IGitHubUserRepository } from "@/types/github";
import type { NextApiRequest, NextApiResponse } from "next";

import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGitHubUserRepository[] | IApiError>,
) {
  if (req.method !== "GET") {
    return res.status(405).send({
      status: 405,
      error: "Method Not Allowed",
    });
  }

  if (!req.query.username) {
    return res.status(400).send({
      status: 400,
      error: "Username is required",
    });
  }

  if (typeof req.query.username !== "string") {
    return res.status(400).send({
      status: 400,
      error: "Username must be a string",
    });
  }

  try {
    const githubResponse = await octokit.request("GET /users/{username}/repos", {
      username: String(req.query.username),
    });

    res.status(200).json(
      githubResponse.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
      })),
    );
  } catch (error: any) {
    res.status(error.status).json({
      status: error.status,
      error: error.message,
    });
  }
}
