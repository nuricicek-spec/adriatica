import { useQuery } from "@tanstack/react-query";
// In a real app, we would import from @shared/routes
// Mocking the route structure since the user provided a dummy schema/route
const api = {
  dummy: {
    get: {
      path: '/api/dummy',
    }
  }
};

export function useDummyData() {
  return useQuery({
    queryKey: [api.dummy.get.path],
    queryFn: async () => {
      // In a real implementation this would fetch from the backend
      // For this landing page demo, we might not even use it, but implementing as requested
      const res = await fetch(api.dummy.get.path);
      if (!res.ok) return []; 
      return await res.json();
    },
  });
}
