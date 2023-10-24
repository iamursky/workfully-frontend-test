import type { IApiError } from "@/types/api";
import type { IGitHubUser } from "@/types/github";
import type { NextApiRequest, NextApiResponse } from "next";

import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGitHubUser | IApiError>,
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
    const githubResponse = await octokit.request("GET /users/{username}", {
      username: String(req.query.username),
    });

    res.status(200).json({
      id: githubResponse.data.id,
      username: githubResponse.data.login,
      name: githubResponse.data.name,
      avatarUrl: githubResponse.data.avatar_url,
      bio: githubResponse.data.bio,
    });
  } catch (error: any) {
    res.status(error.status).json({
      status: error.status,
      error: error.message,
    });
  }
}
