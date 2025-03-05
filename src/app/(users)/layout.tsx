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
            <div className="mt-20 bg-red-500 h-34">

            </div>
            <div className="bg-blue-500 h-96">

            </div>
            {children}
        </div>
    )
}