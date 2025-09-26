import { client } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";

async function getCategoryPosts(category) {
  const query = `
    *[_type == "post" && category->slug.current == $category] 
    | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      publishedAt,
      category->{name, slug}
    }
  `;
  return client.fetch(query, { category });
}

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

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
          <article
            key={post._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {post.mainImage?.asset?.url && (
              <div className="w-full bg-gray-100 flex items-center justify-center">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="object-contain"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
                  {post.category?.name || categoryNames[category]}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-4 line-clamp-2 leading-tight text-gray-900 hover:text-blue-700 transition-colors">
                <Link
                  href={`/${category}/${post.slug?.current}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h2>

              {post.slug?.current && (
                <Link
                  href={`/${category}/${post.slug.current}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline transition-colors"
                >
                  और पढ़ें
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
