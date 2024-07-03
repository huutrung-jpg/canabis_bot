import React, {useState} from "react"
import {Category} from "./Category"
import {Price} from "./Price"
import {Rating} from "./Rating"

export function ProductFilters() {
    const [toggleFilters, setToggleFilters] = useState(false)

    const toggleFiltersBtn = () => {
        setToggleFilters(prev => !prev)
    }

    return (
        <>
            <div className={`block`}>
                <div className='mt-[20px] border-b pb-[15px] w-full flex'>
                    <Category />
                </div>
            </div>
        </>
    )
}
