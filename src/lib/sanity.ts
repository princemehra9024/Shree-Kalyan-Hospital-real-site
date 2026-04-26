import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "placeholder",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-03-26",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getDoctors() {
  return await client.fetch(`*[_type == "doctor"] | order(order asc)`);
}

export async function getFeaturedDoctor() {
  return await client.fetch(`*[_type == "doctor"][0]`);
}

export async function getSpecialties() {
  return await client.fetch(`*[_type == "specialty"]`);
}
