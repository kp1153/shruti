export const schema = {
  types: [
    {
      name: "book",
      title: "Books",
      type: "document",
      fields: [
        {
          name: "title",
          title: "Book Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 96,
            slugify: (input) => {
              return (
                input
                  .toLowerCase()
                  .replace(/[\u0900-\u097F]/g, "") // Hindi characters हटाएगा
                  .replace(/[^\w\s-]/g, "") // Special characters हटाएगा
                  .trim()
                  .replace(/\s+/g, "-") // Spaces को dash बनाएगा
                  .replace(/\-\-+/g, "-")
                  .replace(/^-+/, "")
                  .replace(/-+$/, "") || `book-${Date.now()}`
              );
            },
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "author",
          title: "Author",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "price",
          title: "Price",
          type: "number",
        },
        {
          name: "coverImage",
          title: "Cover Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        },
        {
          name: "category",
          title: "Category",
          type: "string",
          options: {
            list: [
              { title: "Fiction", value: "fiction" },
              { title: "Non-Fiction", value: "non-fiction" },
              { title: "Poetry", value: "poetry" },
              { title: "Drama", value: "drama" },
            ],
          },
        },
        {
          name: "videoLink",
          title: "Video Link",
          type: "url",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https"],
            }),
        },
      ],
    },
  ],
};
