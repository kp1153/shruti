export const schema = {
  types: [
    {
      name: "post",
      title: "Posts",
      type: "document",
      fields: [
        {
          name: "title",
          title: "Title",
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
                  .replace(/[\u0900-\u097F]/g, "")
                  .replace(/[^\w\s-]/g, "")
                  .trim()
                  .replace(/\s+/g, "-")
                  .replace(/\-\-+/g, "-")
                  .replace(/^-+/, "")
                  .replace(/-+$/, "") || `post-${Date.now()}`
              );
            },
          },
          validation: (Rule) => Rule.required(),
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
              { title: "इवेंट्स", value: "events" },
              { title: "फरियाद", value: "fariyaad" },
              { title: "मानवाधिकार", value: "manavadhikar" },
              { title: "विविध", value: "vividh" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "videoLink",
          title: "Video Link",
          type: "url",
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https']
          })
        },
      ],
    },
  ],
};