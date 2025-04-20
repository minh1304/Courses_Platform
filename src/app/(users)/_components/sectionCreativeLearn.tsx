import { UseCarousel } from "@/hooks/useCarousel";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import CoursesList from "@/components/CoursesList";
import { useRouter } from "next/navigation";


export const SectionCreativeLearn = () => {
  const currentImage = UseCarousel({totalImages: 3});
  const router = useRouter();
  const handleCourseClick = () => {
    router.push('/search', {
      scroll: false,
    });
  }
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Creative <br /> Learning <br /> Made Easy
          </h2>
        </div>

        {/* Right Section */}
        <div className="col-span-2">
          <ul className="text-2xl font-bold gap-2">
            <li className="flex items-center">
              ✅{" "}
              <span className="ml-4 mt-4">
                Thousands of creative classes. Beginner to pro.
              </span>
            </li>
            <li className="flex items-center">
              ✅{" "}
              <span className="ml-4 mt-4">
                Taught by creative pros and industry icons.
              </span>
            </li>
            <li className="flex items-center">
              ✅{" "}
              <span className="ml-4 mt-4">
                Learning Paths to help you achieve your goals.
              </span>
            </li>
            <li className="flex items-center">
              ✅{" "}
              <span className="ml-4 mt-4">
                Certificates to celebrate your accomplishments.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-40 max-w-6xl mx-auto grid grid-cols-4 gap-8 items-center">
        {[
          { value: "25K+", label: "Classes" },
          { value: "600K+", label: "Members" },
          { value: "8K+", label: "Teachers" },
          { value: "4.8 ⭐", label: "App Store Rating" },
        ].map((item, index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-4 text-center">
            <p className="text-green-500 text-2xl font-bold">{item.value}</p>
            <p className="text-sm uppercase">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-40 h-[500px] rounded-lg overflow-hidden">
        {/* Left Side Content */}
        <div className="w-1/2 px-16 mx-auto text-white">
          <h2 className="text-4xl font-bold">Courses</h2>
          <p className="mt-8 ">
            This is the list of the courses you can enroll in.
            Course when you need them and when them
          </p>
          <div className="text-black mt-8">
            <Button 
              className="h-12 cursor-pointer"
              variant="outline"
              onClick = {() => handleCourseClick()}
            >Search for courses</Button>
          </div>

        </div>

        {/* Right Side - Image Carousel */}
        <div className="w-1/2 h-full rounded-r-lg relative">
          {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Hero Banner ${index + 1}`}
              fill
              priority={index === currentImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-500 opacity-0 ${
                index === currentImage ? "opacity-100" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-4xl font-bold">Explore Inspiring Online Courses</h2>
        <div className="mt-8 gap-2 flex flex-wrap justify-center">
          {["Featured", "Music", "Marketing", "Animation", "Social Media", "Creative Writing"].map(
            (tag, index) => (<span className="text-sm font-bold border-2 pl-4 pt-1 pr-4 pb-1 m-1 rounded-3xl" key={index}>{tag}</span>)
          )
          }
        </div>
      </div>

      <div>
        <CoursesList/>
      </div>
    </section>
  );
};
