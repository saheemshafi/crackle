import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { cwd } from "process";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const basePath = path.resolve(cwd(), "src", "app", "(routes)");
  const sitemap = generateSitemap(basePath);

  return sitemap.map((path) => {
    const route = path.replaceAll("\\", "/").split("/page.tsx")[0];
    return {
      url: `${process.env.NEXTAUTH_URL}/${route}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    };
  });
}

function generateSitemap(directoryPath: string) {
  const sitemapEntries: string[] = [];

  // Traverse the directory and generate sitemap entries
  function traverseDirectory(currentPath: string) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (file.endsWith("page.tsx")) {
        const route = path.relative(directoryPath, filePath);
        if (!route.includes("[") && !route.includes("]")) {
          sitemapEntries.push(route);
        }
      }
    });
  }

  traverseDirectory(directoryPath);

  return sitemapEntries;
}
