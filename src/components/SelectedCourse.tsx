import React from 'react'
import { Button } from './ui/button';
import AccordionSections from './AccordionSections';

const SelectedCourse = ({ course, handleEnrollNow } : SelectedCourseProps) => {
  return (
    <div className="overflow-hidden py-9 px-9">
      <div>
        <h3 className="text-white font-semibold text-2xl ">{course.title}</h3>
        <p className="text-gray-400 font-sm pt-3">
          By {course.teacherName} |{" "}
          <span className="font-bold text-gray-300">
            {course?.enrollments?.length}
          </span>
        </p>
      </div>
      <div className="mt-5">
        <p className="text-gray-500 mb-4">{course.description}</p>

        <div className="mt-6">
          <h4 className="text-white-50/90 font-semibold mb-2">Course Content</h4>
          <AccordionSections sections={course.sections} />
        </div>

        <div className="flex justify-between items-center mt-5">
          <span className="text-purple-400 font-semibold text-2xl">
            ${course.price}
          </span>
          <Button
            onClick={() => handleEnrollNow(course.courseId)}
            className="bg-purple-600 hover:bg-purple-400"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedCourse
