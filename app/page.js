import { client } from "@/lib/sanity";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";

async function getAllPosts() {
  try {
    const query = `
      *[_type == "post"] 
      | order(publishedAt desc)[0...10] {
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

    const posts = await client.fetch(query);
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
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

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen flex pt-32">
      {/* Hero Section - 70% Width */}
      <div className="w-[70%] border-r border-gray-200">
        <HeroSection />
      </div>

      {/* Posts Section - 30% Width */}
      <div className="w-[30%] bg-white">
        <div className="h-screen overflow-y-auto p-6">
          <div className="sticky top-0 bg-white pb-4 mb-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">ताज़ा समाचार</h2>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="border-b border-gray-100 pb-3 hover:bg-gray-50 hover:p-3 hover:rounded-lg transition-all duration-200"
                >
                  <Link
                    href={`/${post.category?.slug?.current}/${post.slug?.current}`}
                    className="block group"
                  >
                    <h3 className="font-medium text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded text-xs">
                        {post.category?.name}
                      </span>
                      <span className="text-gray-400">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                अभी तक कोई पोस्ट नहीं की गई है
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
