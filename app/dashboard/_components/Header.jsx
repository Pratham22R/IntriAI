'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';

function Header() {
    const { userDetail } = useContext(UserDetailContext);
    const router = useRouter();
    const pathname = usePathname();
    const isDashboardPage = pathname === '/dashboard';
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleBuyCredits = () => {
        router.push('/dashboard/buy-credits');
    };

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className='sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200'>
            {/* Logo */}
            <div className='flex items-center gap-6'>
                <Link href='/' className='flex items-center gap-2'>
                    <Image src='/logo.svg' alt="Logo" width={40} height={40} />
                    <h2 className='font-extrabold text-2xl text-gray-800 tracking-tight'>IntriAI</h2>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-8'>
                <Button
                    variant='ghost'
                    className='text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg font-medium'
                    onClick={handleBuyCredits}
                >
                    Buy More Credits
                </Button>

                {!isDashboardPage && (
                    <Link href='/dashboard'>
                        <Button className='bg-primary text-white hover:bg-primary-dark transition-colors rounded-lg py-2 px-6 font-medium'>
                            Dashboard
                        </Button>
                    </Link>
                )}

                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <Image src='/star.svg' alt="star" width={22} height={22} />
                    <h2 className='text-gray-800 font-semibold text-lg'>{userDetail?.credits}</h2>
                </div>

                <div className='ml-4'>
                    <UserButton />
                </div>
            </div>

            {/* Mobile Hamburger */}
            <div className='md:hidden'>
                <button
                    onClick={toggleDrawer}
                    className="text-gray-800 p-1.5 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    {!isDrawerOpen ? (
                        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}

                </button>
            </div>



            {/* Mobile Drawer Overlay */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={toggleDrawer}
                >
                    {/* Slide-in Drawer */}
                    <div
                        className="absolute top-0 right-0 h-full w-[85%] max-w-xs bg-white rounded-l-2xl shadow-xl p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out animate-slide-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <div className="flex justify-end mb-2">
                            <button onClick={toggleDrawer} className="text-gray-600 hover:text-gray-800 transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Main Menu Items */}
                        <div className="flex flex-col gap-5">
                            <Button
                                variant='ghost'
                                className='text-gray-800 bg-gray-100 justify-start text-base'
                                onClick={() => {
                                    handleBuyCredits();
                                    toggleDrawer();
                                }}
                            >
                                💰 Buy More Credits
                            </Button>

                            {!isDashboardPage && (
                                <Link href='/dashboard' onClick={toggleDrawer}>
                                    <Button className='w-full bg-primary text-white text-base hover:bg-primary-dark'>
                                         Dashboard
                                    </Button>
                                </Link>
                            )}

                            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg shadow-sm">
                                <Image src='/star.svg' alt="star" width={22} height={22} />
                                <h2 className='text-gray-800 font-semibold text-lg'>{userDetail?.credits}</h2>
                            </div>
                        </div>

                        {/* Bottom Profile */}
                        <div className='mt-10 border-t pt-4'>
                            <UserButton />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Header;
