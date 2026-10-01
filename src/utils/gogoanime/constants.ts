import { isSiteReachable } from "../../lib/isSiteReachable";
import { websites_collection, AnimeWebsiteConfig } from "../../config/websites";

type GogoAnimeConfig = {
  BASE: string;
  HOME: string;
  SEARCH: string;
  CATEGORY: string;
  MOVIES: string;
  POPULAR: string;
  NEW_SEASON: string;
  SEASONS: string;
  COMPLETED: string;
  AJAX: string;
};

const gogoanime: AnimeWebsiteConfig = websites_collection["GogoAnime"];
let gogoanime_base = gogoanime.BASE;
const clones_array: string[] = [
  gogoanime.BASE,
  ...Object.values(gogoanime.CLONES ?? {}).flat(),
];

// Build every scraper route from the same selected domain. Previously BASE
// stayed on the original domain even after a fallback was selected.
const makeGogoAnimeObj = (base: string): GogoAnimeConfig => ({
  BASE: base,
  HOME: `${base}/home.html`,
  SEARCH: `${base}/search.html`,
  CATEGORY: `${base}/category/`,
  MOVIES: `${base}/anime-movies.html`,
  POPULAR: `${base}/popular.html`,
  NEW_SEASON: `${base}/new-season.html`,
  SEASONS: `${base}/sub-category/`,
  COMPLETED: `${base}/completed-anime.html`,
  AJAX: "https://ajax.gogocdn.net/ajax",
});

const URL_fn = async (): Promise<GogoAnimeConfig> => {
  try {
    for (const url of clones_array) {
      if (await isSiteReachable(url)) {
        gogoanime_base = url;
        return makeGogoAnimeObj(gogoanime_base);
      }
    }
    throw new Error("No configured GogoAnime domain is reachable");
  } catch (error) {
    console.error("Unable to select a reachable GogoAnime domain:", error);
    throw error;
  }
};

export { URL_fn };
