import React from "react";

export const SectionCreativeLearn = () => {
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
    </section>
  );
};
