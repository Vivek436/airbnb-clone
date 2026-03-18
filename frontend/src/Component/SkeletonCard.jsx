import React from 'react'

function SkeletonCard() {
    return (
        <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg bg-white animate-pulse'>
            {/* Image Skeleton */}
            <div className='w-[100%] h-[67%] bg-gray-300 rounded-t-lg'></div>
            
            {/* Content Skeleton */}
            <div className='w-[100%] h-[33%] py-[20px] px-[10px] flex flex-col gap-[8px]'>
                <div className='w-[80%] h-[20px] bg-gray-300 rounded'></div>
                <div className='w-[60%] h-[16px] bg-gray-300 rounded'></div>
                <div className='w-[40%] h-[18px] bg-gray-300 rounded'></div>
            </div>
        </div>
    )
}

export default SkeletonCard
