"use client";
import React, { useContext, useEffect, useState } from 'react';
import ImageSelection from './_components/ImageSelection';
import RoomType from './_components/RoomType';
import DesignType from './_components/DesignType';
import AdditionalReq from './_components/AdditionalReq';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import CustomLoading from './_components/CustomLoading';
import AiOutputDailog from '../_components/AiOutputDailog';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { eq } from 'drizzle-orm';

function CreateNew() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [aiOutputImage, setAiOutputImage] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();
  const [aiImageUrl, setAiImageUrl] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        if (user?.primaryEmailAddress?.emailAddress && !userDetail) {
          const res = await axios.get(`/api/get-user?email=${user.primaryEmailAddress.emailAddress}`);
          if (res.data) {
            setUserDetail(res.data);
          }
        }
      } catch (error) {
        console.error('Error fetching user detail:', error);
      }
    };

    fetchUserDetail();
  }, [user]);

  const onHandledInputChange = (value, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const GenerateAiImage = async () => {
    if (!userDetail || typeof userDetail.credits !== 'number') {
      console.error("User detail is not ready or malformed.");
      return;
    }

    setLoading(true);
    const rawImageUrl = await saveRawImageToFirebase();

    try {
      const result = await axios.post('/api/Redesign-room', {
        image: rawImageUrl,
        roomType: formData?.roomtype,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      console.log(result.data);
      await updateUserCredit();
      setAiOutputImage(result.data.result);
      setOpenOutputDialog(true);
    } catch (error) {
      console.error('Error generating AI image:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserCredit = async () => {
    if (!userDetail || typeof userDetail.credits !== 'number') {
      console.error("User detail or credits missing");
      return;
    }

    const result = await db.update(Users).set(
      { credits: userDetail.credits - 1 }
    ).where(eq(Users.id, userDetail.id))
      .returning({ id: Users.id });

    if (result) {
      setUserDetail((prev) => ({ ...prev, credits: prev.credits - 1 }));
    }
  };

  const saveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, `AI-Redesign/${fileName}`);

    await uploadBytes(imageRef, formData.image);
    const downloadUrl = await getDownloadURL(imageRef);
    setOrgImage(downloadUrl);
    return downloadUrl;
  };

  if (!userDetail) {
    return <p className="text-center text-gray-500 mt-20">Loading user data...</p>;
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-10 max-w-7xl mx-auto">
      <div className="text-center px-2 sm:px-6">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-2">Experience the magic of AI Remodelling</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment.
        </p>
      </div>

      <div className="flex flex-col gap-10 mt-10 lg:grid lg:grid-cols-2">
        <div className="w-full max-w-md sm:max-w-md md:max-w-xl lg:max-w-md mx-auto">
          <ImageSelection selectedImage={(value) => onHandledInputChange(value, 'image')} />
        </div>

        <div className="w-full max-w-md sm:max-w-md md:max-w-xl lg:max-w-md mx-auto">
          <RoomType selectedRoomType={(value) => onHandledInputChange(value, 'roomtype')} />
          <DesignType selectedDesignType={(value) => onHandledInputChange(value, 'designType')} />
          <AdditionalReq selectedAdditionalReq={(value) => onHandledInputChange(value, 'additionalReq')} />

          <Button
            className={`w-full mt-5 ${userDetail.credits === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={GenerateAiImage}
            disabled={userDetail.credits === 0}
          >
            {userDetail.credits === 0 ? 'No Credits Left' : 'Generate'}
          </Button>

          <p className="text-gray-400 text-sm mt-2">Note: 1 credit will be used to redesign your room.</p>
        </div>
      </div>

      <CustomLoading loading={loading} />
      <AiOutputDailog
        openDialog={openOutputDialog}
        closeDailog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutputImage}
      />
    </div>
  );
}

export default CreateNew;
