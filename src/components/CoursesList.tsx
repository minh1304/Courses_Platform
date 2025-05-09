import { useCourses } from "@/hooks/useCourses";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";


export default function CoursesList() {
  const { data, isLoading, error } = useCourses();
  const router = useRouter();
  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, {
      scroll: false,
    });
  };

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses</p>;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-6 p-4">
      {data?.data &&
      data?.data.slice(0,4).map((course: any, index: number) => (
        <motion.div
          key={course.courseId}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ amount: 0.4 }}
        >
          <Card
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
            onClick={() => handleCourseClick(course.courseId)}
          >
            <CardHeader className="">
              <Image
                src={course.image || "/placeholder.png"}
                alt={course.title}
                width={400}
                height={200}
                className="w-full h-[180px] object-cover rounded-2xl"
                priority
              />
            </CardHeader>
            <CardContent className="flex flex-col justify-between gap-2 p-4 grow">
              <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
                {course.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                {course.description || "No description provided."}
              </CardDescription>

              <div className="mt-2 text-sm text-muted-foreground">
                <p className="text-sm">Teacher: {course.teacherName}</p>
                <span className="">Price: ${course.price}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
