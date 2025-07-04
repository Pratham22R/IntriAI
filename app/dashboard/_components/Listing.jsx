"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import Link from "next/link";
import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";
import { eq } from "drizzle-orm";
import RoomDesignOutput from "./RoomDesignOutput";

function Listing() {
  const { user, isLoaded } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  useEffect(() => {
    if (user) GetUserRoomList();
  }, [user]);

  const GetUserRoomList = async () => {
    const result = await db
      .select()
      .from(AiGeneratedImage)
      .where(eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress?.emailAddress));
    setUserRoomList(result);
    console.log(result);
  };

  if (!isLoaded) {
    return <div className="text-center py-10 text-gray-400">Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      {/* Header with greeting and button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="font-bold text-2xl sm:text-3xl text-primary">
          Hello, {user?.fullName}
        </h2>
        <Link href="/dashboard/create-new">
          <Button className="bg-primary text-white">+ Redesign Room</Button>
        </Link>
      </div>

      {/* Content */}
      {userRoomList?.length === 0 ? (
        <div className="mt-10">
          <EmptyState />
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="font-bold text-xl sm:text-2xl mb-6 text-primary">
            AI Room Studio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRoomList.map((room, index) => (
              <RoomDesignOutput
                key={index}
                room={room}
                user={user}
                GetUserRoomList={GetUserRoomList}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
