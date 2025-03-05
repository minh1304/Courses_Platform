import Header from "./_components/header"

export default function UserLayout({
    children,
} : {
    children: React.ReactNode
}){
    return (
        <div className="h-full">
            <div className="w-full h-20 flex-col fixed inset-y-0 z-50">
                <Header/>
            </div>

            <main className="mt-20">
                {children}
            </main>

            <div className="bg-blue-500 h-96">
                Footer
            </div>
        </div>
    )
}