import React, {useContext} from "react"
import {useDispatch, useSelector} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {addProductToCart} from "../../redux/products/products.slice"
import {faCartShopping,faCircleCheck} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import {Context} from "../../context/context"

export function ProductItem({product}) {
    const {cart} = useSelector(state => state.product)
    const contextId = useContext(Context)
    const isCart = !!cart.find(el => el.id === product.id)
    const dispatch = useDispatch()

    const addToCart = (event) => {
        event.preventDefault()
        dispatch(addProductToCart(product))
    }

    const clickHandler = (productId) => {
        contextId.id = productId
    }

    return (
        <Link to={`/products/${product.id}`} onClick={() => clickHandler(product.id)} className='w-[160px] min-h-[200px] shadow-md mt-[10px] border relative rounded-lg productItem transition-all duration-300 mr-[5px] ml-[5px]'>
            <img className='w-[90%] m-auto mt-[10px] rounded-[5px]' src={product.image} alt={product.name}/>
            <div className='mt-[10px] mb-[20px] px-[10px] text-center font-semibold italic'>{product.name} tao kí ngực fan tao kí ngực fan</div>
        </Link>
    )
}
