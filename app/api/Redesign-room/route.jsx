import { db } from "@/config/db";
import { storage } from "@/config/firebaseConfig";
import { AiGeneratedImage } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { getDefaultConfig } from "tailwind-merge";

const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_KEY,
});
export async function POST(req){
    // const {user}=useUser();
    const {image, roomType, designType, additionalReq, userEmail} = await req.json()
    try{
        const input = {
            image: image,
            prompt:`A ${roomType} in ${designType} style interior with ${additionalReq}.`,
        };
        
        const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
        // return NextResponse.json({result:output});

        // const output ="https://replicate.delivery/xezq/n1rNeV3fyOrPY0JG3SL0MaWX3HfNcAnaD3dOhQF1OhipH2NpA/out.png"

        const base64Image = await convertImageToBase64(output); 

        const fileName = Date.now()+".png";
        const storageRef = ref(storage, `AI-Redesign/${fileName}`);
        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);
        console.log('File available at', downloadUrl);
        
        const dbResult = await db.insert(AiGeneratedImage).values({
            userEmail:userEmail,
            orgImage: image,
            aiImage: downloadUrl,
            roomType: roomType,
            designType: designType,
        }).returning({id:AiGeneratedImage.id});
        console.log("DB Result:", dbResult);
        return NextResponse.json({result:downloadUrl});
    }catch (error) {
        console.error("Error:", error);
        return NextResponse.json({error:error.message})
    }
    
}

async function convertImageToBase64(imageUrl) {
    const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64RawImage = Buffer.from(resp.data).toString('base64');
    return "data:image/png;base64," + base64RawImage;
}