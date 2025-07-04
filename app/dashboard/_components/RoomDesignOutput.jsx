import React, { useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDailog from './AiOutputDailog';

function RoomDesignOutput({ room }) {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div
            className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center items-center cursor-pointer transition hover:shadow-xl duration-300 mx-auto'
            onClick={() => setOpenDialog(true)}
        >
            <div className="w-full">
                <ReactBeforeSliderComponent
                    firstImage={{ imageUrl: room?.aiImage }}
                    secondImage={{ imageUrl: room?.orgImage }}
                />
            </div>

            <div className='flex flex-col justify-evenly items-center mt-4 text-center space-y-1'>
                <h2 className='font-semibold text-base sm:text-lg md:text-xl'>&#127968; Roomtype: {room.roomType}</h2>
                <h2 className='text-sm sm:text-base md:text-lg'>🎨 Design type: {room.designType}</h2>
            </div>

            <AiOutputDailog
                aiImage={room.aiImage}
                orgImage={room.orgImage}
                openDialog={openDialog}
                closeDailog={(open) => setOpenDialog(open)}
            />
        </div>
    );
}

export default RoomDesignOutput;