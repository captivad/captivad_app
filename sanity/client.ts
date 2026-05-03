import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "v8t1l22m",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});