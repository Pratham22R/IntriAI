import React from 'react'
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
} from "@/components/ui/alert-dialog"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden' // import VisuallyHidden
import Image from 'next/image'

function CustomLoading({ loading}) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                {/* Add the AlertDialogTitle for accessibility */}
                <AlertDialogHeader>
                    <VisuallyHidden>
                        <AlertDialogTitle>Loading...</AlertDialogTitle>
                    </VisuallyHidden>
                </AlertDialogHeader>

                <div className="bh-white flex flex-col items-center justify-center my-10">
                    <Image src={'/loading.gif'} alt='loading' width={100} height={100} />
                    <h2>Redesigning your room ... Do not Refresh &#128522;</h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomLoading
