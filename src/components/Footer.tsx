import Link from 'next/link';
import React from 'react'

const Footer = () => {
    return (
        <div className="bg-white bottom-0 w-full py-8 mt-4 text-center text-sm;">
          <p>&copy; 2024 EDROH. All Rights Reserved.</p>
          <div className="mt-2">
            {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-primary-500 mx-2"
                scroll={false}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      );
}

export default Footer
