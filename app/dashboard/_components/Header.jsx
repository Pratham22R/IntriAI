"use client"
import React, { useContext } from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';

function Header() {
    const{userDetail, setUserDetail} = useContext(UserDetailContext);
    
    console.log('User Detail:', userDetail);

  return (
    <div className='sticky top-0 z-50 bg-white-800 shadow-md  p-4 flex justify-between items-center'>
        <div className='flex items-center gap-3 bg-white-800 '>
            <Image src={'/logo.svg'} alt={"Logo"} width={40} height={40} />
            <h2 className='font-bold text-lg'>AI-Room Design</h2>
        </div>
        <Button variant={'ghost'} className='hidden text-primary md:flex items-center gap-2 p-2 rounded-full '>Buy More Credits</Button> 
        <div className='flex items-center gap-7'>
            <div className="flex items-center gap-2 bg-slate-200 p-2 rounded-full shadow-md">
                <Image src={'/star.svg'} alt={"star"} width={25} height={25} className='rounded-full' /> 
                <h2>{userDetail?.credits}</h2>
            </div>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header