import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-dynamic";

async function getPostBySlugAndCategory(slug, categorySlug) {
  try {
    const post = await client.fetch(
      `
      *[_type == "post" && slug.current == $slug && category->slug.current == $categorySlug][0] {
        _id,
        title,
        "slug": slug.current,
        mainImage {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        content,
        publishedAt,
        "category": {
          "name": category->name,
          "slug": category->slug.current
        }
      }
    `,
      { slug, categorySlug }
    );

    if (!post) return null;

    return {
      ...post,
      mainImage: post.mainImage?.asset ? post.mainImage : null,
      mainImageUrl: post.mainImage?.asset
        ? urlFor(post.mainImage).width(1200).height(600).url()
        : null,
      mainImageAlt: post.mainImage?.alt || post.title,
      mainImageCaption: post.mainImage?.caption || "",
    };
  } catch (error) {
    console.error("Error fetching post by slug and category:", error);
    return null;
  }
}

// Custom components for PortableText
const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-gray-800 leading-relaxed text-lg">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-6 text-gray-900 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-4 text-gray-900 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-3 text-gray-900 mt-5">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-700 my-6 bg-blue-50 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-4 text-gray-800 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4 text-gray-800 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="my-8">
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(value).width(1200).height(600).url()}
            alt={value.alt || "Article image"}
            fill
            className="object-contain bg-gray-100"
          />
        </div>
        {value.caption && (
          <p className="text-sm text-gray-600 text-center mt-2 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
};

export default async function PostPage({ params }) {
  const { category, slug } = params;

  const safeCategory = decodeURIComponent(category);
  const safeSlug = decodeURIComponent(slug);

  const validCategories = ["events", "fariyaad", "manavadhikar", "vividh"];

  if (!validCategories.includes(safeCategory)) {
    notFound();
  }

  const post = await getPostBySlugAndCategory(safeSlug, safeCategory);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const categoryNames = {
    events: "इवेंट्स",
    fariyaad: "फरियाद",
    manavadhikar: "मानवाधिकार",
    vividh: "विविध",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            होम
          </Link>
          <span>→</span>
          <Link href={`/${category}`} className="hover:text-blue-600">
            {categoryNames[category]}
          </Link>
          <span>→</span>
          <span className="text-gray-800">{post.title}</span>
        </div>

        {/* Date */}
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">{formatDate(post.publishedAt)}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-gray-900 leading-tight">
          {post.title}
        </h1>

        {/* Main Image */}
        {post.mainImageUrl && (
          <div className="w-full mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.mainImageUrl}
              alt={post.mainImageAlt}
              width={1200}
              height={600}
              className="object-contain w-full max-h-[80vh] bg-gray-100"
              priority
            />
          </div>
        )}

        {/* Image Caption */}
        {post.mainImageCaption && (
          <p className="text-center text-sm text-gray-600 mb-8 italic -mt-4">
            {post.mainImageCaption}
          </p>
        )}

        {/* Content */}
        <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <PortableText
              value={post.content}
              components={portableTextComponents}
            />
          </div>
        </article>

        {/* Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${category}`}
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            ← {categoryNames[category]} में वापस
          </Link>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            होम पेज
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
