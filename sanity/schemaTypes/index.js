// schemas/index.js
export const schema = {
  types: [
    // Category Schema
    {
      name: "category",
      title: "श्रेणी (Category)",
      type: "document",
      fields: [
        {
          name: "name",
          title: "श्रेणी का नाम",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("श्रेणी का नाम आवश्यक है"),
        },
        {
          name: "slug",
          title: "URL Slug",
          type: "slug",
          options: {
            source: "name",
            maxLength: 96,
            slugify: (input) => {
              const categoryMap = {
                इवेंट्स: "events",
                फरियाद: "fariyaad",
                मानवाधिकार: "manavadhikar",
                विविध: "vividh",
              };
              if (categoryMap[input]) return categoryMap[input];
              return input
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w\-]+/g, "")
                .replace(/\-\-+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
            },
          },
          validation: (Rule) => Rule.required().error("Slug आवश्यक है"),
        },
        {
          name: "displayOrder",
          title: "प्रदर्शन क्रम",
          type: "number",
          description: "होमपेज पर दिखने का क्रम (1, 2, 3, 4)",
          validation: (Rule) => Rule.min(1).max(4),
        },
      ],
    },

    // Post Schema
    {
      name: "post",
      title: "पोस्ट (Post)",
      type: "document",
      fields: [
        {
          name: "title",
          title: "शीर्षक",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "slug",
          title: "URL Slug",
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
          name: "content",
          title: "सामग्री",
          type: "blockContent",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "mainImage",
          title: "मुख्य तस्वीर",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "publishedAt",
          title: "प्रकाशन तारीख",
          type: "datetime",
          initialValue: () => new Date().toISOString(),
          validation: (Rule) => Rule.required(),
        },
        {
          name: "category",
          title: "श्रेणी",
          type: "reference",
          to: [{ type: "category" }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "featured",
          title: "मुख्य पोस्ट",
          type: "boolean",
          description: "क्या यह मुख्य पोस्ट है? (होमपेज पर हाइलाइट होगी)",
          initialValue: false,
        },
      ],
      orderings: [
        {
          title: "नया पहले",
          name: "publishedAtDesc",
          by: [{ field: "publishedAt", direction: "desc" }],
        },
        {
          title: "मुख्य पोस्ट पहले",
          name: "featuredFirst",
          by: [
            { field: "featured", direction: "desc" },
            { field: "publishedAt", direction: "desc" },
          ],
        },
      ],
    },

    // Block Content Schema
    {
      name: "blockContent",
      title: "Block Content",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [
            { title: "सामान्य", value: "normal" },
            { title: "शीर्षक 2", value: "h2" },
            { title: "शीर्षक 3", value: "h3" },
            { title: "उद्धरण", value: "blockquote" },
          ],
          lists: [
            { title: "बुलेट पॉइंट", value: "bullet" },
            { title: "संख्या सूची", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "मोटा (Bold)", value: "strong" },
              { title: "तिरछा (Italic)", value: "em" },
            ],
            annotations: [
              {
                title: "लिंक",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                  {
                    title: "नई विंडो में खोलें",
                    name: "blank",
                    type: "boolean",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          title: "तस्वीर",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
};
