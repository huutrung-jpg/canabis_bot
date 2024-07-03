import React from "react"

export function Footer() {
    return (
        <footer className='bg-black text-white'>
            <div className='max-w-[1240px] mx-auto py-2 text-sm sm:text-base'>
                <div className='flex justify-center'>
                    <div href='#'
                       target='_blank'
                       rel="noreferrer"
                       className='capitalize border-b mb-3 text-base hover:text-gray-300 transition'
                    >
                        CANABIS SHOP
                    </div>
                </div>
                <div className='flex justify-center flex-col items-center'>
                    <div target="_blank"
                       rel="noreferrer"
                       className='hover:text-gray-300 transition'
                    >
                        Created by NT
                    </div>
                </div>
            </div>
        </footer>
    )
}
