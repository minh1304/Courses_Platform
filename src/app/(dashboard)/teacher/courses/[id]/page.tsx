"use client"
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter} from 'next/navigation';
import React from 'react'

const CourseEdit = () => {
  const router = useRouter();
  const params = useParams();
    const id = params.id as string;
  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <button
          className="flex items-center border border-gray-400 rounded-lg p-2 gap-2 cursor-pointer hover:bg-gray-500 hover:text-white-100 text-white"
          onClick={() => router.push("/teacher/courses", { scroll: false })}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>
      </div>
    </div>
  );
}

export default CourseEdit
