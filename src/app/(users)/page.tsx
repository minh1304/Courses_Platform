import { Button } from '@/components/ui/button'
import React from 'react'
import Image from "next/image";

const HomePage = () => {
  return (
    <div className='w-full min-h-1/2 bg-white flex items-center py-16 px-6 text-center'>
      {/* Hero Section */}
      <div className='flex items-center gap-x-2 w-2/3'>
        <h1 className="ml-26 text-5xl font-bold max-w-2xl leading-tight">
          Become a pro with thousands of creative classes.
        </h1>
      </div>
      {/* Sign-up Section */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-lg text-black ">
        <h2 className="text-xl font-semibold mb-4">Get <span className="text-green-500 font-bold">7 free days</span> of Skillshare</h2>
        
        <div className="space-y-3 mb-4">
          <Button variant="outline" className="w-full flex items-center justify-center gap-x-2">
            <Image src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png" alt="Google" width={20} height={20} />
            Continue with Google
          </Button>
        </div>
        <div className='font-light text-sm'>
          <p>
          By signing up you agree to Skillshare's Terms of Service and Privacy Policy, and agree to receive marketing communications from Skillshare at the email address provided. 
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
