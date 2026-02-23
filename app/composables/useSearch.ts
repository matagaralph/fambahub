import type { SearchResponse } from "~/types";

export interface SearchSuggestion {
  id: number;
  name: string;
  subtitle: string;
  type: "destination" | "attraction";
  url: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function useSearch() {
  const searchTerm = ref("");
  const isLoading = ref(false);
  const suggestions = ref<SearchSuggestion[]>([]);
  const showResults = ref(false);

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  async function fetchResults(term: string) {
    if (term.trim().length < 2) {
      suggestions.value = [];
      showResults.value = false;
      return;
    }

    isLoading.value = true;

    try {
      const data = await $fetch<SearchResponse>(
        "https://api.fambahub.com/search/freetext",
        {
          method: "POST",
          body: {
            searchTerm: term,
            searchTypes: [
              {
                searchType: "ATTRACTIONS",
                pagination: { start: 1, count: 5 },
              },
              {
                searchType: "DESTINATIONS",
                pagination: { start: 1, count: 5 },
              },
            ],
            currency: "USD",
          },
        },
      );

      const merged: SearchSuggestion[] = [];

      // Map destinations
      if (data.destinations?.results) {
        for (const dest of data.destinations.results) {
          merged.push({
            id: dest.id,
            name: dest.name,
            subtitle: dest.parentDestinationName || "Destination",
            type: "destination",
            url: `/${slugify(dest.name)}/d${dest.id}-ttd`,
          });
        }
      }

      // Map attractions
      if (data.attractions?.results) {
        for (const attr of data.attractions.results) {
          merged.push({
            id: attr.id,
            name: attr.name,
            subtitle: attr.destinationName || "Attraction",
            type: "attraction",
            url: `/${slugify(attr.destinationName || attr.name)}/d${attr.primaryDestinationId}-ttd`,
          });
        }
      }

      // Interleave destinations and attractions, cap at 7
      const destinations = merged.filter((s) => s.type === "destination");
      const attractions = merged.filter((s) => s.type === "attraction");
      const interleaved: SearchSuggestion[] = [];
      const maxLen = Math.max(destinations.length, attractions.length);

      for (let i = 0; i < maxLen && interleaved.length < 7; i++) {
        const dest = destinations.at(i);
        if (dest !== undefined && interleaved.length < 7) {
          interleaved.push(dest);
        }
        const attr = attractions.at(i);
        if (attr !== undefined && interleaved.length < 7) {
          interleaved.push(attr);
        }
      }

      suggestions.value = interleaved;
      showResults.value = interleaved.length > 0;
    } catch {
      suggestions.value = [];
      showResults.value = false;
    } finally {
      isLoading.value = false;
    }
  }

  function debouncedSearch(term: string) {
    if (debounceTimer) clearTimeout(debounceTimer);
    searchTerm.value = term;

    if (term.trim().length < 2) {
      suggestions.value = [];
      showResults.value = false;
      isLoading.value = false;
      return;
    }

    isLoading.value = true;
    debounceTimer = setTimeout(() => {
      fetchResults(term);
    }, 350);
  }

  function clearSearch() {
    searchTerm.value = "";
    suggestions.value = [];
    showResults.value = false;
    isLoading.value = false;
    if (debounceTimer) clearTimeout(debounceTimer);
  }

  return {
    searchTerm,
    isLoading,
    suggestions,
    showResults,
    debouncedSearch,
    clearSearch,
  };
}
