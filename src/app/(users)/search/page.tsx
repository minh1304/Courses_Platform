"use client"
import CourseCardSearch from '@/components/CourseCardSearch';
import Loading from '@/components/Loading';
import SelectedCourse from '@/components/SelectedCourse';
import { useCourses } from '@/hooks/useCourses';
import { motion } from 'motion/react';
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Search = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: courses, isLoading, isError } = useCourses();
 
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();

  useEffect(() => {
    if(courses) {
        if(id) {
            const course = courses.find((c: any) => c.courseId === id);
            setSelectedCourse(course || courses[0]);
        }
        else {
            setSelectedCourse(courses[0]);
        }
    }
  },[courses, id])

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    router.push(`/search?id=${course.courseId}`, {
      scroll: false,
    });
  };
  const handleEnrollNow = () => {

  }
  if (isLoading) return <Loading />;
  if (isError || !courses) return <div>Failed</div>; 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col bg-background text-foreground h-full mx-auto w-full"
    >
      <section className="bg-black text-white py-16 px-6">
        <h1 className="font-normal text-2xl mt-14">
          List of available courses
        </h1>
        <h2 className="text-gray-500 mb-3">
          {courses.length} courses available
        </h2>
        <div className="w-full flex flex-col-reverse md:flex-row pb-8 pt-2 gap-8">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="basis-3/5 grid grid-cols-1 xl:grid-cols-2 gap-6 auto-rows-fr"
          >
            {courses.map((course: Course) => (
              <CourseCardSearch
                key={course.courseId}
                course={course}
                isSelected={selectedCourse?.courseId === course.courseId}
                onClick={() => handleCourseSelect(course)}
              />
            ))}
          </motion.div>

          {selectedCourse && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="basis-2/5 min-w-[350px] h-fit border-2 border-purple-400 bg-gray-800 overflow-hidden rounded-lg"
            >
              <SelectedCourse
                course={selectedCourse}
                handleEnrollNow={handleEnrollNow}
              />
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
}

export default Search
