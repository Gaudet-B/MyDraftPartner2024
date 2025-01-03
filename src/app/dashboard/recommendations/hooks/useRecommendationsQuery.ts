import { api } from "~/trpc/react";

export default function useRecommendationsQuery(
  args: Parameters<typeof api.recommendations.getRecommendations.useQuery>[0],
) {
  const recsQuery = api.recommendations.getRecommendations.useQuery(args);
  const { data, isError, error } = recsQuery;
  return {
    recommendations: data,
    isError,
    error,
    refetch: recsQuery.refetch,
  };
}
