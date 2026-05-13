import { env } from "@/lib/env";

type CmsRequestOptions = {
  path: string;
  tags?: string[];
};

export function isCmsConfigured() {
  return Boolean(
    env.optional.cmsApiUrl &&
      env.optional.cmsApiKey &&
      env.optional.cmsProjectId,
  );
}

export async function fetchCmsJson({ path, tags = [] }: CmsRequestOptions) {
  if (!isCmsConfigured()) {
    return null;
  }

  const baseUrl = env.optional.cmsApiUrl;
  const projectId = env.optional.cmsProjectId;
  const apiKey = env.optional.cmsApiKey;

  if (!baseUrl || !projectId || !apiKey) {
    return null;
  }

  const url = new URL(`/projects/${projectId}${path}`, baseUrl);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      next: {
        revalidate: 300,
        tags: ["cms", ...tags],
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json() as Promise<unknown>;
  } catch {
    return null;
  }
}
