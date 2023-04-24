import slug from "slug";

export default async (context: any) => {
  if (!context.data) {
    return context;
  }

  if (!context.data.hasOwnProperty("title")) {
    return context;
  }

  context.data.slug = slug(context.data.title);
};
