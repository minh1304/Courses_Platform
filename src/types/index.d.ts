declare global {
  interface User {
    email: string;
    password: string;
  }
  interface UserSignUp {
    email: string;
    fullName: string;
    password: string;
  }
  interface DecodedToken {
    username: string;
    usertype: string;
    exp: number;
  }
  interface Course {
    courseId: string;
    teacherId: string;
    teacherName: string;
    title: string;
    description?: string;
    category: string;
    image?: string;
    price?: number; // Stored in cents (e.g., 4999 for $49.99)
    level: "Beginner" | "Intermediate" | "Advanced";
    status: "Draft" | "Published";
    sections: Section[];
    enrollments?: Array<{
      userId: string;
    }>;
  }
  interface SearchCourseCardProps {
    course: Course;
    isSelected?: boolean;
    onClick?: () => void;
  }
  interface SelectedCourseProps {
    course: Course;
    handleEnrollNow: (courseId: string) => void;
  }
  interface Chapter {
    chapterId: string;
    title: string;
    content: string;
    video?: string | File;
    freePreview?: boolean;
    type: "Text" | "Quiz" | "Video";
  }

  interface Section {
    sectionId: string;
    sectionTitle: string;
    sectionDescription?: string;
    chapters: Chapter[];
  }
  interface AccordionSectionsProps {
    sections: Section[];
  }
  interface AppSidebarProps {
    name?: string | null
    email?: string | null
    image?: string | null
    usertype?: string | null
  }
  interface DropdownAvatar {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}
  
  export {};