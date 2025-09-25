import { client } from "@/lib/sanity";
import PostCard from "@/components/PostCard";

async function getCategoryPosts(category) {
  const query = `
    *[_type == "post" && category->slug.current == $category] 
    | order(publishedAt desc) {
      title,
      slug,
      mainImage,
      publishedAt,
      category->{name, slug}
    }
  `;
  return client.fetch(query, { category });
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  const posts = await getCategoryPosts(category);

  const categoryNames = {
    events: "इवेंट्स",
    fariyaad: "फरियाद",
    manavadhikar: "मानवाधिकार",
    vividh: "विविध",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryNames[category]}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug.current} post={post} />
        ))}
      </div>
    </div>
  );
}
