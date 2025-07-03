"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import React, { useContext, useEffect, useState } from 'react'
import EmptyState from './EmptyState';
import Link from 'next/link';
import { db } from '@/config/db';
import { AiGeneratedImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
import RoomDesignOutput from './RoomDesignOutput';

function Listing() {
    const { user, isLoaded } = useUser();
    const [userRoomList, setUserRoomList] = useState([]);
    useEffect(() => {
        user && GetUserRoomList();
    }, [user])
    const GetUserRoomList = async () => {
        const result = await db.select().from(AiGeneratedImage).where(eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress?.emailAddress));
        setUserRoomList(result);
        console.log(result);
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex   justify-between items-center ">
                <h2 className='font-bold text-3xl'>Hello, {user?.fullName}</h2>
                <Link href={'/dashboard/create-new'}>
                    <Button className='mt-4 bg-primary text-white' variant='outline'>+ Redesign Room</Button>
                </Link>
            </div>
            {userRoomList?.length == 0 ? <EmptyState /> :
                <div className='mt-10'>
                    <h2 className='font-bold text-2xl mb-7 text-primary'>AI Room Studio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
                        {userRoomList.map((room, index) => (
                            <RoomDesignOutput key={index} room={room} user={user} GetUserRoomList={GetUserRoomList} />
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default Listing;

