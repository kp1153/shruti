"use client";

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

// Your env variables
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

// Optional: custom structure function
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: schema, // or simply schema
  plugins: [
    deskTool({
      // use custom structure if you have
      structure: structure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
