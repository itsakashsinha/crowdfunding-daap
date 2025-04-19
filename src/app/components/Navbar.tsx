// 'use client';
// import Image from 'next/image';
// import logo from "@public/thirdweb.svg";
// import Link from 'next/link';
// import { ConnectButton, lightTheme, useActiveAccount } from 'thirdweb/react';
// import { client } from '../client';

// const Navbar = ()=>{
//     const account = useActiveAccount();
//     return(
//         <div>
//             <nav className="bg-slate-100 border-b-2 border-b-slate-300">
//                 <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//                     <div className="relative flex h-16 items-center justify-between">
//                         <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                             <div className="flex flex-shrink-0 items-center">
//                                 <Image
//                                     src={logo}
//                                     alt='Your company'
//                                     width={32}
//                                     height={32}
//                                     style={{
//                                         filter: "drop-shadow(0px 0px 24px #a726a9a8",
//                                     }}
//                                 />
//                             </div>
//                             <div className='hidden sm:ml-6 sm:block'>
//                                 <div className='flex space-x-4'>
//                                     <Link href={'/'}>
//                                         <p className='rounded-md px-3 py-2 text-sm font-medium text-slate-700'>Campaign</p>
//                                     </Link>
//                                     {account && (
//                                        <Link href={`/dashboard/${account?.address}`}>
//                                             <p className='rounded-md px-3 py-2 text-sm font-medium text-slate-700'>Dashboard</p>
//                                        </Link> 
//                                     )}
//                                 </div>                                
//                             </div>
//                             <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
//                                 <ConnectButton
//                                     client={client}
//                                     theme={lightTheme()}
//                                     detailsButton={{
//                                         style:{
//                                             maxHeight: "50px",
//                                         }
//                                     }}
//                                 /> 
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     )
// };

// export default Navbar;


// gradient navbar

// 'use client';
// import Image from 'next/image';
// import logo from "@public/logo.png";
// import Link from 'next/link';
// import { ConnectButton, lightTheme, useActiveAccount } from 'thirdweb/react';
// import { client } from '../client';

// const Navbar = ()=>{
//     const account = useActiveAccount();
//     return(
//         <div>
//             <nav className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-b-slate-200 shadow-sm">
//                 <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//                     <div className="relative flex h-16 items-center justify-between">
//                         <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                             <div className="flex flex-shrink-0 items-center">
//                                 <Image
//                                     src={logo}
//                                     alt='Your company'
//                                     width={52}
//                                     height={52}
//                                     style={{
//                                         filter: "drop-shadow(0px 0px 24px #a726a9a8",
//                                     }}
//                                 />
//                             </div>
//                             <div className='hidden sm:ml-6 sm:block'>
//                                 <div className='flex space-x-4'>
//                                     <Link href={'/'}>
//                                         <p className='rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white/50 transition-all'>Campaign</p>
//                                     </Link>
//                                     {account && (
//                                        <Link href={`/dashboard/${account?.address}`}>
//                                             <p className='rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white/50 transition-all'>Dashboard</p>
//                                        </Link> 
//                                     )}
//                                 </div>                                
//                             </div>
//                             <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
//                                 <ConnectButton
//                                     client={client}
//                                     theme={lightTheme()}
//                                     detailsButton={{
//                                         style:{
//                                             maxHeight: "50px",
//                                         }
//                                     }}
//                                 /> 
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     )
// };

// export default Navbar;


'use client';
import Image from 'next/image';
import logo from "@public/logo.png";
import Link from 'next/link';
import { ConnectButton, lightTheme, useActiveAccount } from 'thirdweb/react';
import { client } from '../client';
import { useState } from 'react';

const Navbar = () => {
    const account = useActiveAccount();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Hamburger icon SVG
    const HamburgerIcon = () => (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );

    // Close icon SVG
    const CloseIcon = () => (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    return (
        <nav className="bg-white/30 border-b border-slate-200 shadow-sm backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and main nav (left side) */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <Image
                                    src={logo}
                                    alt="Company Logo"
                                    width={52}
                                    height={52}
                                    className="hover:scale-105 transition-transform"
                                    style={{
                                        filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                                    }}
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block ml-6">
                            <div className="flex space-x-4">
                                <NavLink href="/">Campaigns</NavLink>
                                {account && (
                                    <NavLink href={`/dashboard/${account.address}`}>
                                        Dashboard
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-white/50 focus:outline-none"
                            aria-expanded="false"
                        >
                            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                        </button>
                    </div>

                    {/* Connect Button (right side) */}
                    {/* <div className="hidden md:block ml-6">
                        <ConnectButton
                            client={client}
                            theme={lightTheme({
                                colors: {
                                    accentText: "#4f46e5",
                                    accentButtonBg: "#ffffff",
                                    primaryButtonBg: "#4f46e5",
                                    primaryButtonText: "#ffffff",
                                }
                            })}
                            detailsButton={{
                                style: {
                                    maxHeight: "50px",
                                    backgroundColor: "white",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.375rem",
                                    padding: "0.5rem 1rem",
                                }
                            }}
                        />
                    </div> */}

                    <div className="hidden md:block ml-6">
                        {/* <ConnectButton
                            client={client}
                            theme={lightTheme({
                                colors: {
                                    accentText: "#4f46e5",
                                    accentButtonBg: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
                                    primaryButtonBg: "#4f46e5",
                                    primaryButtonText: "#ffffff",
                                    secondaryButtonBg: "rgba(255, 255, 255, 0.8)",
                                    secondaryButtonText: "#4f46e5",
                                    secondaryButtonHoverBg: "rgba(255, 255, 255, 0.9)",
                                }
                            })}
                            detailsButton={{
                                style: {
                                    maxHeight: "50px",
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                    border: "1px solid rgba(226, 232, 240, 0.7)",
                                    borderRadius: "0.5rem",
                                    padding: "0.5rem 1.25rem",
                                    backdropFilter: "blur(8px)",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                                    transition: "all 0.2s ease",
                                    fontWeight: "500",
                                    ":hover": {
                                        backgroundColor: "rgba(255, 255, 255, 1)",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        borderColor: "#c7d2fe"
                                    }
                                }
                            }}
                        /> */}
                        <ConnectButton
                            client={client}
                            theme={lightTheme({
                                colors: {
                                    accentText: "#4f46e5",
                                    accentButtonBg: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
                                    primaryButtonBg: "#4f46e5",
                                    primaryButtonText: "#ffffff",
                                    secondaryButtonBg: "rgba(255, 255, 255, 0.8)",
                                    secondaryButtonText: "#4f46e5",
                                    secondaryButtonHoverBg: "rgba(255, 255, 255, 0.9)",
                                },
                            })}
                            detailsButton={{
                                className:
                                    "max-h-[50px] bg-white/90 border border-gray-300 rounded-md px-5 py-2 backdrop-blur-lg shadow-sm transition-all ease-in-out duration-200 font-medium hover:bg-white hover:shadow-md hover:border-indigo-300",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-slate-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
                            Campaigns
                        </MobileNavLink>
                        {account && (
                            <MobileNavLink
                                href={`/dashboard/${account.address}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </MobileNavLink>
                        )}
                        <div className="px-3 py-2">
                            <ConnectButton
                                client={client}
                                theme={lightTheme({
                                    colors: {
                                        accentText: "#4f46e5",
                                        accentButtonBg: "#ffffff",
                                        primaryButtonBg: "#4f46e5",
                                        primaryButtonText: "#ffffff",
                                    }
                                })}
                            />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Reusable NavLink component for desktop
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href}>
        <p className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-white/50 hover:text-indigo-600 transition-all duration-200">
            {children}
        </p>
    </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ href, onClick, children }: {
    href: string;
    onClick: () => void;
    children: React.ReactNode
}) => (
    <Link href={href} onClick={onClick}>
        <p className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">
            {children}
        </p>
    </Link>
);

export default Navbar;