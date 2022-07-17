import { useState } from 'react'
// import Link from 'next/link'

function NavLink({to, children}) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

function MobileNav({open, setOpen}) {
    return (

        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <a className="text-xl font-semibold" href="/">LOGO</a>
            </div>
            <div className="flex flex-col ml-4">
                <input
                    className="border-2 border-gray-300 bg-white h-10 w-60 pl-4 pr-8 my-3 rounded-lg text-md focus:outline-none"
                    type="search" name="search" placeholder="Search"/>


                <a className="text-xl font-medium my-3" href="/" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Home
                </a>
                <a className="text-xl font-normal my-3" href="/contact" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Contact
                </a>

                <a className="text-xl font-medium my-3" href="/" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Login
                </a>

                <a className="text-xl font-medium my-3" href="/" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Signup
                </a>


            </div>  
        </div>

    )
}



export default function Navbar() {

    const [open, setOpen] = useState(false)
    return (
        <nav className={"flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center"}>
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center">
                <a className="text-2xl font-semibold" href="/">LOGO</a>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">

                    <NavLink to="/about">
                        HOME
                    </NavLink>

                    <NavLink to="/contact">
                        ABOUT
                    </NavLink>

                    <NavLink to="/about">
                        LOGIN
                    </NavLink>

                    <NavLink to="/about">
                        SIGNUP
                    </NavLink>
                </div>

                <div className="hidden md:flex">
                    <input
                            className="border-2 border-gray-300 bg-white h-10 w-70 pl-4 pr-8 rounded-lg text-md focus:outline-none"
                            type="search" name="search" placeholder="Search"/>
                </div>


            </div>
        </nav>
    )
}




// export default function Navbar() {
//     return (

// <nav
//         className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
//         <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
//             <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
//                 <span className="font-semibold text-xl tracking-tight">My Navbar</span>
//             </div>
//             <div className="block lg:hidden ">
//                 <button
//                     id="nav"
//                     className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700">
//                     <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
//                         <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
//                     </svg>
//                 </button>
//             </div>
//         </div>
    
//         <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
//             <div className="text-md font-bold text-blue-700 lg:flex-grow">
//                 <a href="#responsive-header"
//                    className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
//                     Menu 1
//                 </a>
//                 <a href="#responsive-header"
//                    className=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
//                     Menu 2
//                 </a>
//                 <a href="#responsive-header"
//                    className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
//                     Menu 3
//                 </a>
//             </div>

//             <div className="relative mx-auto text-gray-600 lg:block hidden">
//                 <input
//                     className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
//                     type="search" name="search" placeholder="Search"/>
//                 <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
//                     <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
//                          version="1.1" id="Capa_1" x="0px" y="0px"
//                          viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;"
//                          xml:space="preserve"
//                          width="512px" height="512px">
//                 <path
//                     d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
//               </svg>
//                 </button>
//             </div>
//             <div className="flex ">
//                 <a href="#"
//                    className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">Sign
//                     in</a>
    
//                 <a href="#"
//                    className=" block text-md px-4  ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">login</a>
//             </div>
//         </div>
    
//     </nav>

//     )
// }