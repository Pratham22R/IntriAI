import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

function AiOutputDailog({ openDialog, closeDailog, orgImage, aiImage }) {
    return (
        <AlertDialog open={openDialog} onOpenChange={closeDailog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Result:</AlertDialogTitle>
                    <ReactBeforeSliderComponent
                        firstImage={{
                            imageUrl: aiImage,
                        }}
                        secondImage={{
                            imageUrl: orgImage,
                        }}
                    />
                    <Button onClick={closeDailog}>Close</Button> {/* Just call closeDailog without arguments */}
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AiOutputDailog;  