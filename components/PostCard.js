import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

export default function PostCard({ post }) {
  const formatDate = (dateString) => {
    if (!dateString) return "तारीख उपलब्ध नहीं";

    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fallback values for missing data
  const postTitle = post?.title || "शीर्षक उपलब्ध नहीं";
  const postSlug = post?.slug?.current || "";
  const categorySlug = post?.category?.slug?.current || "";
  const publishedDate = post?.publishedAt;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={post?.mainImage}
          alt={postTitle}
          width={400}
          height={250}
          className="w-full h-full object-cover"
        />

        {/* Category Badge */}
        {post?.category?.name && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {post.category.name}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-800 hover:text-blue-600 transition-colors">
          {postTitle}
        </h3>

        <p className="text-gray-500 text-sm mb-3 flex items-center">
          <span className="mr-1">📅</span>
          {formatDate(publishedDate)}
        </p>

        {/* Read More Link - only show if we have valid slugs */}
        {postSlug && categorySlug ? (
          <Link
            href={`/${categorySlug}/${postSlug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
          >
            और पढ़ें
            <span className="ml-1">→</span>
          </Link>
        ) : (
          <div className="text-gray-400 text-sm">लिंक उपलब्ध नहीं</div>
        )}
      </div>
    </div>
  );
}
