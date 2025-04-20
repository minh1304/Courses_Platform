import Image from "next/image";
import React from "react";

const CourseCardSearch = ({
  course,
  isSelected,
  onClick,
}: SearchCourseCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 overflow-hidden rounded-lg hover:bg-gray-700 transition duration-200 flex flex-col cursor-pointer border-2 h-full group ${
        isSelected ? "border-purple-400" : "border-transparent"
      }`}
    >
      {/* Image Wrapper */}
      <div className="relative w-full pt-[56.25%]">
        <Image
          src={course.image || "/placeholder.png"}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="font-semibold text-white line-clamp-1">
            {course.title}
          </h2>
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">
            {course.description}
          </p>
        </div>

        <div className="mt-3">
          <p className="text-gray-400 text-sm">By {course.teacherName}</p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-primary-500 font-semibold">
              ${course.price}
            </span>
            <span className="text-gray-400 text-sm">
              {course.enrollments?.length || 0} Enrolled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSearch;
