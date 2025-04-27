import Image from 'next/image'
import React from 'react'

function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center mt-10 gap-4'>
        <Image src={'/luxurious-office-with-modern-furnishings-architecture_7023-479468__1_-removebg-preview.png'} alt={"Placeholder"} width={500} height={500} className='mx-auto' />
        <h2 className='font-medium text-lg texxt-gray-500'>Create new AI Interior Design of your room</h2>
    </div>
  )
}

export default EmptyState