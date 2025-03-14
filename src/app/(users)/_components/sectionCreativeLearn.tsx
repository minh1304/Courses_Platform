import { UseCarousel } from "@/hooks/useCarousel";
import Image from "next/image";
import React from "react";

export const SectionCreativeLearn = () => {
  const currentImage = UseCarousel({totalImages: 3});
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

      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-4 gap-8 items-center">
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

      <div className="flex items-center justify-between mt-12 h-[500px] rounded-lg overflow-hidden">
        {/* Left Side Content */}
        <div className="w-1/2 px-16 mx-auto text-white text-center">AHIHI</div>

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
    </section>
  );
};
