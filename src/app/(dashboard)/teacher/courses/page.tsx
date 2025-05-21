"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Courses = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  
  const config = {
    headers: { Authorization: `Bearer ${user?.accessToken}` },
  };

  const handleCreateCourse = async () => {
    if (!user) return;

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`,
      {
        status: "Draft",
        title: "",
        description: "",
        category: "",
        image: "",
        price: 0,
        level: "",
        teacherId: user.id,
        teacherName: user.name,
        sections: [],
        enrollments: [],
      },
      config
    );
    router.push(`/teacher/courses/${result.data.data.courseId}`, {
      scroll: false,
    });
  };
  return (
    <div className="teacher-courses">
      <Header
        title="Courses"
        subtitle="Browse your courses"
        rightElement={
          <Button
            onClick={handleCreateCourse}
            className="bg-indigo-700 hover:bg-indigo-600 text-white cursor-pointer"
          >
            Create Course
          </Button>
        }
      />
      {/* <Toolbar
          onSearch={setSearchTerm}
          onCategoryChange={setSelectedCategory}
        /> 
        <div className="teacher-courses__grid">
          {filteredCourses.map((course) => (
            <TeacherCourseCard
              key={course.courseId}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isOwner={course.teacherId === user?.id}
            />
          ))}
        </div> */}
    </div>
  );
};

export default Courses;
