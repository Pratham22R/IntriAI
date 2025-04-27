import Image from 'next/image'
import React, { useState } from 'react'

function DesignType({ selectedDesignType }) {
    const Designs = [
        { id: 1, name: 'Modern', image: '/modern.jpg' },
        { id: 2, name: 'Minimalist', image: '/Minimalist.jpg' },
        { id: 3, name: 'Traditional', image: '/Traditional.jpg' },
        { id: 4, name: 'Industrial', image: '/Industrial.jpg' },
        { id: 5, name: 'Scandinavian', image: '/Scandinavian.jpg' },
        { id: 6, name: 'Bohemian', image: '/Bohemian.webp' },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="space-y-4 mt-3 ">
            <label className="text-slate-400 mb-2 block">Select Interior Design Type*</label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {Designs.map((design) => (
                    <div
                        key={design.id}
                        onClick={() => {setSelectedOption(design.name);selectedDesignType(design.name)}}
                        className={`flex flex-col items-center space-y-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedOption === design.name
                                ? 'border-2 border-blue-500 bg-blue-50 shadow-md'
                                : 'border border-gray-200 hover:shadow-md'
                            }`}
                    >
                        <div className="w-24 h-24 relative">
                            <Image
                                src={design.image}
                                alt={design.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                            {selectedOption === design.name && (
                                <div className="absolute top-0 right-0 bg-blue-500 rounded-full p-1">
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <p className="text-center text-gray-700 text-sm font-semibold">{design.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DesignType;
