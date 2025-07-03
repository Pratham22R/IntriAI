'use client'
import React, { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Header() {
    const { userDetail } = useContext(UserDetailContext);
    const router = useRouter();

    const handleBuyCredits = () => {
        router.push('/dashboard/buy-credits');
    };

    // Check if the current path is the dashboard page
    const isDashboardPage = router.pathname === '/dashboard';

    return (
        <div className='sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200'>
            <div className='flex items-center gap-6'>
                <Link href={'/'} className='flex items-center gap-2'>
                    <Image src={'/logo.svg'} alt={"Logo"} width={40} height={40} />
                    <h2 className='font-extrabold text-2xl text-gray-800 tracking-tight'>IntriAI</h2>
                </Link>
            </div>

            <div className='hidden md:flex items-center gap-8'>
                {/* Buy More Credits Button */}
                <Button
                    variant='ghost'
                    className='text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg font-medium'
                    onClick={handleBuyCredits}
                >
                    Buy More Credits
                </Button>

                {/* Conditionally render the Dashboard button only if the user is not on the dashboard page */}
                {!isDashboardPage && (
                    <Link href={'/dashboard'}>
                        <Button className='bg-primary text-white hover:bg-primary-dark transition-colors rounded-lg py-2 px-6 font-medium'>
                            Dashboard
                        </Button>
                    </Link>
                )}

                {/* Credits Section */}
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <Image src={'/star.svg'} alt={"star"} width={22} height={22} className='rounded-full' />
                    <h2 className='text-gray-800 font-semibold text-lg'>{userDetail?.credits}</h2>
                </div>

                {/* User Button */}
                <div className='ml-4'>
                    <UserButton />
                </div>
            </div>
        </div>
    );
}

export default Header;
