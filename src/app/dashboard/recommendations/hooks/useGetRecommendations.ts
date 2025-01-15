import { Player } from "@prisma/client";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function useGetRecommendations() {
  const [recommendations, setRecommendations] =
    useState<Array<{ pick: number; recommendation: Player }>>();
  const mutation = api.recommendations.getRecommendations.useMutation();
  const getRecommendations = (args: Parameters<typeof mutation.mutate>[0]) => {
    mutation.mutate(args, {
      onSuccess: (data) => setRecommendations(data),
      onError: (error) => console.error(error),
    });
  };
  // const getRecs = api.recommendations.getRecommendations.useMutation(args);
  // const { data, isError, error, mutate } = getRecs;
  // return {
  //   recommendations: data,
  //   isError,
  //   error,
  //   // refetch: recsQuery.refetch,
  //   mutate,
  // };
  return { recommendations, getRecommendations };
}
