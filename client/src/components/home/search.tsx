import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";

interface ServiceCategory {
  id: number;
  name: string;
}

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  // Get categories from API
  const { data: categories = [] } = useQuery<ServiceCategory[]>({
    queryKey: ["/api/categories"],
  });

  // Popular search terms with translation keys
  const popularSearches = [
    { key: "searchMidfielder", term: t("searchMidfielder") },
    { key: "searchGoalkeeper", term: t("searchGoalkeeper") },
    { key: "searchProfessionalCoach", term: t("searchProfessionalCoach") },
    { key: "searchStriker", term: t("searchStriker") },
    { key: "searchInjuryDoctor", term: t("searchInjuryDoctor") },
  ];

  const handleSearch = () => {
    // Construct search parameters
    const params = new URLSearchParams();

    if (searchQuery) {
      params.append("query", searchQuery);
    }

    if (selectedCategory && selectedCategory !== "all") {
      params.append("category", selectedCategory);
    }

    // Navigate to services with search parameters
    setLocation(`/#services?${params.toString()}`);
  };

  const handlePopularSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    handleSearch();
  };

  return (
    <section className="bg-gradient-to-r from-primary-100 to-accent-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 font-serif">
              {t("searchForTalent")}
            </h2>
            <p className="text-gray-500 mt-2">{t("searchDescription")}</p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="py-6 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="md:w-1/4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t("allCategories")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allCategories")}</SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button
                onClick={handleSearch}
                className="h-12 px-6 w-full md:w-auto"
              >
                <SearchIcon className="h-4 w-4 ml-2" />
                {t("search")}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {popularSearches.map((item) => (
              <Badge
                key={item.key}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handlePopularSearch(item.term)}
              >
                {item.term}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;
