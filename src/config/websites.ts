type WebsiteConfig = {
  BASE: string;
};

export type AnimeWebsiteConfig = WebsiteConfig & {
  CLONES?: Record<string, string[]>;
};

type Websites = Record<string, AnimeWebsiteConfig>;

// Anime website domains are ordered by preference. Each source's URL helper
// probes BASE first, then CLONES, and builds all routes from the first live
// domain. Keep provider domains here so domain changes do not require editing
// route or scraper code.
export const websites_collection: Websites = {
  AniWatch: {
    BASE: "https://aniwatch.co.at",
    CLONES: {
      AniWatch: ["https://aniwatchtv.ro"],
      HiAnime: ["https://hianimes.se", "https://hianime.lu"],
    },
  },
  GogoAnime: {
    BASE: "https://gogoanime.or.at",
    CLONES: {
      GogoAnime: ["https://www.gogoanimes.watch"],
    },
  },
  KickAssAnime: {
    BASE: "https://kickass-anime.ro",
  },
};
