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

function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
    return (
        <AlertDialog open={openDialog}>
            <AlertDialogContent className="ai-output-dialog">
                <AlertDialogHeader className="dialog-header">
                    <AlertDialogTitle className="dialog-title">Result:</AlertDialogTitle>
                </AlertDialogHeader>

                {/* Before-After Image Slider */}
                <div className="image-slider-container">
                    <ReactBeforeSliderComponent
                        firstImage={{ imageUrl: aiImage }}
                        secondImage={{ imageUrl: orgImage }}
                        sliderLineColor="#fff" // Customize the slider line color
                    />
                </div>

                <AlertDialogFooter className="dialog-footer">
                    {/* Close button */}
                    <Button
                        className="close-button"
                        onClick={closeDialog}
                    >
                        Close
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AiOutputDialog;
