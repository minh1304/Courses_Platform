import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCourses = async () => {
  const { data } = await axios.get("http://localhost:3333/courses");
  return data;
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
