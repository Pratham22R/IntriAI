'use client';
import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

function AiOutputDailog({ openDialog, closeDailog, orgImage, aiImage }) {
    return (
        <AlertDialog open={openDialog} onOpenChange={closeDailog}>
            <AlertDialogContent className="w-full max-w-4xl px-2 sm:px-6 py-6">
                <AlertDialogHeader className="mb-4">
                    <AlertDialogTitle className="text-lg sm:text-xl font-semibold">Result:</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="overflow-x-auto rounded-md">
                    <ReactBeforeSliderComponent
                        firstImage={{ imageUrl: aiImage }}
                        secondImage={{ imageUrl: orgImage }}
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <Button onClick={() => closeDailog(false)} className="px-6 py-2">Close</Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AiOutputDailog;
