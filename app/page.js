import { client } from "@/lib/sanity";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";
import Link from "next/link";

async function getHomePageData() {
  try {
    const query = `{
      "events": *[_type == "post" && category->slug.current == "events"] 
        | order(publishedAt desc)[0...4] {
        title, slug, mainImage, publishedAt, category->{name, slug}
      },
      "fariyaad": *[_type == "post" && category->slug.current == "fariyaad"] 
        | order(publishedAt desc)[0...4] {
        title, slug, mainImage, publishedAt, category->{name, slug}
      },
      "manavadhikar": *[_type == "post" && category->slug.current == "manavadhikar"] 
        | order(publishedAt desc)[0...4] {
        title, slug, mainImage, publishedAt, category->{name, slug}
      },
      "vividh": *[_type == "post" && category->slug.current == "vividh"] 
        | order(publishedAt desc)[0...4] {
        title, slug, mainImage, publishedAt, category->{name, slug}
      }
    }`;

    const data = await client.fetch(query);

    // Ensure all categories have default empty arrays
    return {
      events: data.events || [],
      fariyaad: data.fariyaad || [],
      manavadhikar: data.manavadhikar || [],
      vividh: data.vividh || [],
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    // Return default structure if fetch fails
    return {
      events: [],
      fariyaad: [],
      manavadhikar: [],
      vividh: [],
    };
  }
}

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <div>
      <HeroSection />

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">इवेंट्स</h2>
          <Link href="/events" className="text-blue-600 hover:text-blue-800">
            सभी देखें →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.events && data.events.length > 0 ? (
            data.events.map((post) => (
              <PostCard key={post.slug?.current || Math.random()} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                अभी तक कोई इवेंट पोस्ट नहीं की गई है
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Fariyaad Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">फरियाद</h2>
          <Link href="/fariyaad" className="text-blue-600 hover:text-blue-800">
            सभी देखें →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.fariyaad && data.fariyaad.length > 0 ? (
            data.fariyaad.map((post) => (
              <PostCard key={post.slug?.current || Math.random()} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                अभी तक कोई फरियाद पोस्ट नहीं की गई है
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Manavadhikar Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">मानवाधिकार</h2>
          <Link
            href="/manavadhikar"
            className="text-blue-600 hover:text-blue-800"
          >
            सभी देखें →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.manavadhikar && data.manavadhikar.length > 0 ? (
            data.manavadhikar.map((post) => (
              <PostCard key={post.slug?.current || Math.random()} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                अभी तक कोई मानवाधिकार पोस्ट नहीं की गई है
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Vividh Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">विविध</h2>
          <Link href="/vividh" className="text-blue-600 hover:text-blue-800">
            सभी देखें →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.vividh && data.vividh.length > 0 ? (
            data.vividh.map((post) => (
              <PostCard key={post.slug?.current || Math.random()} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                अभी तक कोई विविध पोस्ट नहीं की गई है
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
