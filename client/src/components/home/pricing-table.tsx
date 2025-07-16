import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";

interface Service {
  id: number;
  name: string;
  rating: number;
  badge?: string;
}

interface PricingItem {
  id: number;
  serviceId: number;
  name: string;
  price: string;
  description?: string;
  unit: string;
}

interface ServiceFeature {
  id: number;
  serviceId: number;
  featureName: string;
  value: string;
}

interface Category {
  id: number;
  name: string;
}

interface ComparisonData {
  services: Service[];
  features: Record<string, Record<number, string>>;
}

export function PricingTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>("1"); // Default to Art Classes

  // Query for categories
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["/api/categories"],
  });

  // Query for category-specific services and comparison data
  const { data: comparisonData, isLoading: isComparisonLoading } =
    useQuery<ComparisonData>({
      queryKey: ["/api/compare", selectedCategory],
      queryFn: async () => {
        try {
          // First get services by category
          const servicesRes = await apiRequest(
            "GET",
            `/api/services?categoryId=${selectedCategory}`,
          );

          // Check if API is not available (503 status)
          if (servicesRes.status === 503) {
            console.warn("API not available, returning mock comparison data");
            return {
              services: [
                {
                  id: 1,
                  name: "خدمة تجريبية 1",
                  price: "100",
                  features: ["ميزة 1", "ميزة 2"],
                },
                {
                  id: 2,
                  name: "خدمة تجريبية 2",
                  price: "200",
                  features: ["ميزة 1", "ميزة 2", "ميزة 3"],
                },
              ],
              features: {
                "ميزة 1": [true, true],
                "ميزة 2": [true, true],
                "ميزة 3": [false, true],
              },
            };
          }

          if (!servicesRes.ok)
            throw new Error("Failed to fetch category services");
          const services: Service[] = await servicesRes.json();

          // If we have services, get comparison data
          if (services.length > 0) {
            const serviceIds = services.map((s) => s.id).join(",");
            const compareRes = await apiRequest(
              "GET",
              `/api/compare?ids=${serviceIds}`,
            );

            // Check if API is not available for comparison
            if (compareRes.status === 503) {
              console.warn(
                "API not available for comparison, returning mock data",
              );
              return {
                services: services,
                features: {},
              };
            }

            if (!compareRes.ok)
              throw new Error("Failed to fetch comparison data");
            return await compareRes.json();
          }

          return { services: [], features: {} };
        } catch (error) {
          // Handle network errors
          if (error instanceof TypeError && error.message.includes("fetch")) {
            console.warn("Network error in pricing table, returning mock data");
            return {
              services: [
                {
                  id: 1,
                  name: "خدمة تجريبية 1",
                  price: "100",
                  features: ["ميزة 1", "ميزة 2"],
                },
                {
                  id: 2,
                  name: "خدمة تجريبية 2",
                  price: "200",
                  features: ["ميزة 1", "ميزة 2", "ميزة 3"],
                },
              ],
              features: {
                "ميزة 1": [true, true],
                "ميزة 2": [true, true],
                "ميزة 3": [false, true],
              },
            };
          }
          throw error;
        }
      },
      enabled: !!selectedCategory,
    });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Render a cell based on feature value
  const renderFeatureCell = (value: string | undefined) => {
    if (!value) return <XCircle className="mx-auto text-red-500 h-5 w-5" />;

    if (value === "Yes") {
      return <CheckCircle className="mx-auto text-green-500 h-5 w-5" />;
    } else if (value === "No") {
      return <XCircle className="mx-auto text-red-500 h-5 w-5" />;
    } else if (value.startsWith("$")) {
      return <span className="font-medium text-gray-900">{value}</span>;
    } else {
      return <span className="text-gray-400">{value}</span>;
    }
  };

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-serif sm:text-4xl">
            Compare Pricing & Features
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-4">
            Easily compare prices and features across different art services
          </p>
        </div>

        {/* Service category tabs */}
        <div className="mt-10">
          {isCategoriesLoading ? (
            <div className="flex justify-center space-x-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-32" />
                ))}
            </div>
          ) : (
            <Tabs
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="w-full"
            >
              <TabsList className="w-full max-w-4xl mx-auto h-auto flex flex-wrap mb-2 bg-transparent">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id.toString()}
                    className="py-2 flex-1 sm:flex-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id.toString()}>
                  {/* Comparison table will be rendered for all tabs but only visible for the active one */}
                  {isComparisonLoading ? (
                    <Card>
                      <CardContent className="p-4">
                        <Skeleton className="h-80 w-full" />
                      </CardContent>
                    </Card>
                  ) : (comparisonData?.services.length || 0) > 0 ? (
                    <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                              >
                                Service
                              </th>
                              {comparisonData?.services.map((service) => (
                                <th
                                  key={service.id}
                                  scope="col"
                                  className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <div className="flex flex-col items-center">
                                    <span>{service.name}</span>
                                    <div className="mt-1 flex items-center text-yellow-400 text-sm">
                                      {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                          <span
                                            key={i}
                                            className={
                                              i < Math.floor(service.rating)
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                            }
                                          >
                                            ★
                                          </span>
                                        ))}
                                      <span className="ml-1 text-gray-500">
                                        ({service.rating})
                                      </span>
                                    </div>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(comparisonData?.features || {}).map(
                              ([featureName, values]) => (
                                <tr key={featureName}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {featureName}
                                  </td>
                                  {comparisonData?.services.map((service) => (
                                    <td
                                      key={service.id}
                                      className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500"
                                    >
                                      {renderFeatureCell(values[service.id])}
                                    </td>
                                  ))}
                                </tr>
                              ),
                            )}

                            {/* Overall recommendation row */}
                            <tr className="bg-primary-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-700">
                                Overall Best Value
                              </td>
                              {comparisonData?.services.map((service) => (
                                <td
                                  key={service.id}
                                  className="px-6 py-4 whitespace-nowrap text-sm text-center"
                                >
                                  {service.badge && (
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${service.badge === "Top Rated" || service.badge === "Recommended" ? "bg-primary-100 text-primary-800" : ""}
                                        ${service.badge === "Budget Pick" ? "bg-green-100 text-green-800" : ""}
                                      `}
                                    >
                                      {service.badge === "Top Rated"
                                        ? "Recommended"
                                        : service.badge}
                                    </span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-gray-500">
                          No comparison data available for this category.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>

        {/* Legend/Explanation */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 font-serif">
              Understanding the comparison
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Prices and availability may vary by location. All data is updated
              weekly.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Full Comparison (PDF)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingTable;
