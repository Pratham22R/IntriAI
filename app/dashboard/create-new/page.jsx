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
  
    console.log("User detail at updateUserCredit:", userDetail);
  
    const result = await db.update(Users).set(
      { credits: userDetail.credits - 1 }
    ).where(eq(Users.id, userDetail.id)) // ✅ CORRECT usage
    .returning({ id: Users.id });
  
    if (result) {
      setUserDetail((prev) => ({ ...prev, credits: prev.credits - 1 }));
    }
  };

  const saveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, `AI-Redesign/${fileName}`);

    await uploadBytes(imageRef, formData.image).then(() => {
      console.log('Uploaded a blob or file!');
    });

    const downloadUrl = await getDownloadURL(imageRef);
    console.log('File available at', downloadUrl);
    setOrgImage(downloadUrl);
    return downloadUrl;
  };

  if (!userDetail) {
    return <p className="text-center text-gray-500 mt-20">Loading user data...</p>;
  }

  return (
    <div className="px-4 md:px-10 py-10">
      <div className="text-center">
        <h2 className="font-bold text-4xl text-primary mb-2">Experience the magic of AI Remodelling</h2>
        <p className="text-gray-400">Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 justify-items-center">
        <div className="w-full max-w-[400px]">
          <ImageSelection selectedImage={(value) => onHandledInputChange(value, 'image')} />
        </div>
        <div className="w-full max-w-[400px]">
          <RoomType selectedRoomType={(value) => onHandledInputChange(value, 'roomtype')} />
          <DesignType selectedDesignType={(value) => onHandledInputChange(value, 'designType')} />
          <AdditionalReq selectedAdditionalReq={(value) => onHandledInputChange(value, 'additionalReq')} />
          <Button className="w-full mt-5" onClick={GenerateAiImage}>Generate</Button>
          <p className="text-gray-400 text-sm mt-2">Note 1 credit will be used to redesign your room</p>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDailog openDialog={openOutputDialog} closeDailog={() => setOpenOutputDialog(false)} orgImage={orgImage} aiImage={aiOutputImage} />
    </div>
  );
}

export default CreateNew;
