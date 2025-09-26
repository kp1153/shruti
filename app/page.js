import { client, urlFor } from "@/lib/sanity";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import Image from "next/image";

async function getHomePageData() {
  try {
    const query = `{
      "events": *[_type == "post" && category->slug.current == "events"] 
        | order(publishedAt desc)[0...2] {
        _id, title, slug, mainImage, publishedAt, category->{name, slug}
      },
      "fariyaad": *[_type == "post" && category->slug.current == "fariyaad"] 
        | order(publishedAt desc)[0...2] {
        _id, title, slug, mainImage, publishedAt, category->{name, slug}
      },
      "manavadhikar": *[_type == "post" && category->slug.current == "manavadhikar"] 
        | order(publishedAt desc)[0...2] {
        _id, title, slug, mainImage, publishedAt, category->{name, slug}
      },
      "vividh": *[_type == "post" && category->slug.current == "vividh"] 
        | order(publishedAt desc)[0...2] {
        _id, title, slug, mainImage, publishedAt, category->{name, slug}
      }
    }`;

    const data = await client.fetch(query);

    return {
      events: data.events || [],
      fariyaad: data.fariyaad || [],
      manavadhikar: data.manavadhikar || [],
      vividh: data.vividh || [],
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      events: [],
      fariyaad: [],
      manavadhikar: [],
      vividh: [],
    };
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
  const data = await getHomePageData();

  const renderCategorySection = (posts, categoryName, categorySlug) => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Link
          href={`/${categorySlug}`}
          className="hover:text-blue-600 transition-colors"
        >
          <h2 className="text-lg font-semibold">{categoryName}</h2>
        </Link>
        <Link
          href={`/${categorySlug}`}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          सभी देखें →
        </Link>
      </div>
      <div className="space-y-4">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <article
              key={post._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {post.mainImage && (
                <div className="relative w-full h-40">
                  <Image
                    src={urlFor(post.mainImage).width(400).height(250).url()}
                    alt={post.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}

              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">
                    {post.category?.name || categoryName}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>

                <h3 className="text-sm font-bold mb-2 line-clamp-2 leading-tight text-gray-900 hover:text-blue-700 transition-colors">
                  <Link
                    href={`/${categorySlug}/${post.slug?.current}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>

                {post.slug?.current && (
                  <Link
                    href={`/${categorySlug}/${post.slug.current}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-xs hover:underline transition-colors"
                  >
                    और पढ़ें
                    <svg
                      className="w-3 h-3 ml-1"
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
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">
              अभी तक कोई पोस्ट नहीं की गई है
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {renderCategorySection(data.events, "इवेंट्स", "events")}
          {renderCategorySection(data.fariyaad, "फरियाद", "fariyaad")}
          {renderCategorySection(
            data.manavadhikar,
            "मानवाधिकार",
            "manavadhikar"
          )}
          {renderCategorySection(data.vividh, "विविध", "vividh")}
        </div>
      </div>
    </div>
  );
}
