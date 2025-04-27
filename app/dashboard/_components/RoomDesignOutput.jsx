import React, { useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDailog from './AiOutputDailog';

function RoomDesignOutput({ room }) {
    const [openDialog, setOpenDialog] = useState(false);

    const onClickHandler = () => {
        setOpenDialog(true); 
    };

    const closeDialogHandler = () => {
        setOpenDialog(false); 
    };

    return (
        <div className='w-full bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center items-center cursor-pointer' onClick={onClickHandler}>
            <ReactBeforeSliderComponent
                firstImage={{
                    imageUrl: room?.aiImage,
                }}
                secondImage={{
                    imageUrl: room?.orgImage,
                }}
            />
            <div className='flex flex-col justify-evenly items-center mt-4'>
                <h2 className='text-bold'>&#127968; Roomtype: {room.roomType}</h2>
                <h2>🎨 Design type: {room.designType}</h2>
            </div>

            {/* Pass openDialog state to AiOutputDailog and control visibility */}
            <AiOutputDailog 
                aiImage={room.aiImage} 
                orgImage={room.orgImage} 
                closeDialog={closeDialogHandler} 
                openDialog={openDialog} 
            />
        </div>
    );
}

export default RoomDesignOutput;
