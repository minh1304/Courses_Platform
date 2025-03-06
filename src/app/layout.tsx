import type { Metadata } from 'next'
 
// These styles apply to every route in the application
import './globals.css'
import { Navbar } from '@/components/navbar'
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>
          <div className="h-full">
              <div className="w-full h-20 flex-col fixed inset-y-0 z-50">
                  <Navbar/>
              </div>

              <main className="mt-20">
                  {children}
              </main>

              <div className="bg-blue-500 h-96">
                  Footer
              </div>
          </div>     
        </main>
      </body>
    </html>
  )
}