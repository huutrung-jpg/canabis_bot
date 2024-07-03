import React, { useState } from "react"
import { useGetAllCategoryQuery } from "../../redux/products/products.api"
import { filtersProductsByCategory } from "../../redux/products/products.slice"
import { useDispatch, useSelector } from "react-redux"
import './Category.css'

export function Category() {
    const [filterIndex, setFilterIndex] = useState(0)
    const { filters } = useSelector(state => state.product)
    const dispatch = useDispatch()

    const changeCategory = (event, index) => {
        setFilterIndex(index)
        if (event.target.checked) {
            dispatch(filtersProductsByCategory({ category: event.target.id }))
        } else {
            dispatch(filtersProductsByCategory({}))
        }
    }

    const { data, error, isLoading, status } = useGetAllCategoryQuery()

    return (
        <>
            {/* {data && data.map((option, index) => (
                <div key={index} className='py-1 flex'>
                    <input
                        className='outline-0 cursor-pointer w-[15px]'
                        type="checkbox"
                        id={option.id}
                        checked={filters.category && filterIndex === index}
                        onChange={(event) => changeCategory(event, index)}
                    />
                    <label htmlFor={option.id} className='pl-1 cursor-pointer'>{option.title}</label>
                </div>
            ))} */}
             {data && data.map((option, index) => (
                <div key={index} className='py-1 flex'>
                    <input
                        className='hidden'
                        type="checkbox"
                        id={option.id}
                        checked={filters.category && filterIndex === index}
                        onChange={(event) => changeCategory(event, index)}
                    />
                    <label htmlFor={option.id} className={`cursor-pointer btn-category ${filters.category && filterIndex === index ? 'active' : ''}`}>
                        {option.title}
                    </label>
                </div>
            ))}
        </>
    )
}
