'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

const Profile = () => {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6">
      <h1 className="text-lg font-semibold text-white mb-6">Profile details</h1>

      {/* Profile section */}
      <div className="flex items-center justify-between border-t border-gray-700 py-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.image ?? "https://github.com/shadcn.png"}
            alt="Avatar"
            className="w-12 h-12 rounded-full border border-gray-600 object-cover"
          />
          <div className="text-white">{user?.name ?? 'Anonymous'}</div>
        </div>
        <button className="text-sm text-blue-500 hover:underline">Update profile</button>
      </div>

      {/* Email address section */}
      <div className="border-t border-gray-700 py-6">
        <div className="text-sm text-white mb-2">Email addresses</div>
        <div className="flex items-center justify-between">
          <div className="text-gray-300 text-sm ml-4">
            {user?.email ?? 'no-email@example.com'}
            <span className="ml-2 px-2 py-1 text-xs bg-gray-600 text-white rounded-full">Primary</span>
          </div>
          {/* <button className="text-gray-400 hover:text-white">⋯</button> */}
        </div>
      </div>

      {/* Connected accounts section */}
      <div className="border-t border-gray-700 py-6">
        {/* <div className="text-sm text-white mb-2">Connected accounts</div> */}
      </div>
    </div>
  )
}

export default Profile
