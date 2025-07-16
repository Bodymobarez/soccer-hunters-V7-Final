import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  MapPin,
  StarIcon,
  BadgePoundSterling,
  Palette,
  Store,
  Truck,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Service {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  location: string;
  features: string;
  isTopRated: boolean;
  isFeatured: boolean;
  badge: string;
}

interface Category {
  id: number;
  name: string;
}

export function ServiceCompare() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [location, setLocation] = useLocation();
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.hash.split("?")[1] || "")
      : new URLSearchParams();
  const queryParam = searchParams.get("query") || "";
  const categoryParam = searchParams.get("category") || "";

  // Query for categories
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["/api/categories"],
  });

  // Query for services based on filters
  const { data: services = [], isLoading: isServicesLoading } = useQuery<
    Service[]
  >({
    queryKey: ["/api/services", selectedCategory, queryParam],
    queryFn: async () => {
      try {
        const url = new URL("/api/services", window.location.origin);

        if (selectedCategory) {
          url.searchParams.append("categoryId", selectedCategory.toString());
        }

        if (queryParam) {
          url.searchParams.append("query", queryParam);
        }

        const res = await apiRequest("GET", url.pathname + url.search);

        // Check if API is not available (503 status)
        if (res.status === 503) {
          console.warn("API not available, returning mock services data");
          return [
            {
              id: 1,
              name: "خدمة تجريبية 1",
              description: "وصف تجريبي للخدمة",
              price: "100",
              category: "تجريبي",
              rating: 4.5,
              location: "الرياض",
            },
            {
              id: 2,
              name: "خدمة تجريبية 2",
              description: "وصف تجريبي آخر",
              price: "200",
              category: "تجريبي",
              rating: 4.0,
              location: "جدة",
            },
          ];
        }

        if (!res.ok) throw new Error("Failed to fetch services");
        return res.json();
      } catch (error) {
        // Handle network errors
        if (error instanceof TypeError && error.message.includes("fetch")) {
          console.warn("Network error in service compare, returning mock data");
          return [
            {
              id: 1,
              name: "خدمة تجريبية 1",
              description: "وصف تجريبي للخدمة",
              price: "100",
              category: "تجريبي",
              rating: 4.5,
              location: "الرياض",
            },
            {
              id: 2,
              name: "خدمة تجريبية 2",
              description: "وصف تجريبي آخر",
              price: "200",
              category: "تجريبي",
              rating: 4.0,
              location: "جدة",
            },
          ];
        }
        throw error;
      }
    },
  });

  // Set initial category from URL params if present
  useEffect(() => {
    if (categoryParam && !selectedCategory) {
      setSelectedCategory(parseInt(categoryParam));
    }
  }, [categoryParam]);

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const navigateToDetails = (serviceId: number) => {
    setLocation(`/service/${serviceId}`);
  };

  return (
    <section id="services" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-serif sm:text-4xl">
            استعرض المواهب الرياضية
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-4">
            اكتشف أفضل اللاعبين والمدربين والأطباء المتاحين للتعاقد
          </p>
        </div>

        {/* Filter options */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className="rounded-full"
            onClick={() => handleCategoryClick(null)}
          >
            All Services
          </Button>

          {isCategoriesLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="h-10 w-28 rounded-full" />
                ))
            : categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className="rounded-full"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </Button>
              ))}
        </div>

        {/* Search results info */}
        {queryParam && (
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              {services.length} results for "
              <span className="font-medium">{queryParam}</span>"
            </p>
          </div>
        )}

        {/* Service cards */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isServicesLoading ? (
            // Loading skeletons
            Array(3)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : services.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-500">
                No services found matching your criteria.
              </p>
              <Button
                className="mt-4"
                onClick={() => handleCategoryClick(null)}
              >
                View All Services
              </Button>
            </div>
          ) : (
            services.map((service) => (
              <Card
                key={service.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 w-full relative">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  {service.badge && (
                    <Badge
                      className={`
                        ${service.badge === "Top Rated" ? "bg-green-100 text-green-800" : ""}
                        ${service.badge === "Most Popular" ? "bg-blue-100 text-blue-800" : ""}
                        ${service.badge === "Best Value" ? "bg-purple-100 text-purple-800" : ""}
                      `}
                    >
                      {service.badge}
                    </Badge>
                  )}

                  <h3 className="mt-2 text-lg font-medium text-gray-900 font-serif">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {service.description}
                  </p>

                  <div className="mt-4">
                    <div className="flex items-center">
                      <div className="flex items-center text-yellow-400">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(service.rating) ? "fill-current" : "stroke-current fill-none"}`}
                            />
                          ))}
                      </div>
                      <p className="ml-2 text-sm text-gray-500">
                        {service.rating} ({service.reviewCount} reviews)
                      </p>
                    </div>
                  </div>

                  <dl className="mt-4 space-y-3">
                    <div className="flex items-start">
                      <BadgePoundSterling className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <dd className="ml-2 text-sm text-gray-700">
                        {service.priceRange}
                      </dd>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <dd className="ml-2 text-sm text-gray-700">
                        {service.location}
                      </dd>
                    </div>
                    <div className="flex items-start">
                      <Palette className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <dd className="ml-2 text-sm text-gray-700">
                        {service.features}
                      </dd>
                    </div>
                  </dl>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigateToDetails(service.id)}
                  >
                    Details
                  </Button>
                  <Button className="flex-1">Compare</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {services.length > 0 && (
          <div className="mt-12 text-center">
            <Button size="lg" className="px-6">
              Load More Services
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServiceCompare;
