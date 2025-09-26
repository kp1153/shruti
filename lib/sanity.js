import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Get posts by category for homepage sections
export async function getPostsByCategory(categorySlug) {
  try {
    const query = `
      *[_type == "post" && category->slug.current == $categorySlug] 
      | order(publishedAt desc) {
        title,
        slug,
        mainImage,
        publishedAt,
        category->{name, slug}
      }
    `;
    return await client.fetch(query, { categorySlug });
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}
