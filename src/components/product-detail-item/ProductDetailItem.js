import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../../redux/products/products.api";
import { faCartShopping, faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader } from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/products/products.slice";
import { Context } from "../../context/context";
import { Colors } from "../optionsProduct/Colors";
import { Sizes } from "../optionsProduct/Sizes";
import { Brands } from "../optionsProduct/Brands";

export function ProductDetailItem({ product, priceList, refetch, status }) {
    const contextId = useContext(Context);
    const { cart } = useSelector(state => state.product);

    const { data, isLoading, error } = useGetProductByCategoryQuery(product.categoryId);
    const filterProductFooter = data?.filter(item => item.id !== product.id);

    const dispatch = useDispatch();

    const addProduct = (price) => () => dispatch(addProductToCart(price));

    const countStar = rating => {
        const arr = [];
        const ratingRound = Math.round(rating);
        for (let i = 0; i < ratingRound; i++) {
            arr.push(i);
        }
        return arr.map(star => <FontAwesomeIcon key={star} className='text-yellow-500' icon={faStar} />);
    };

    const optionsProduct = category => {
        if (category === 'men\'s clothing' || category === 'women\'s clothing') return <Colors />;
        if (category === 'jewelery') return <Sizes />;
        if (category === 'electronics') return <Brands />;
    };

    const clickHandler = (productId) => {
        contextId.id = productId;
        refetch();
        if (status === "fulfilled") {
            const body = document.querySelector('body').getBoundingClientRect().top + window.scrollY;
            window.scroll({
                top: body,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className='px-2 pb-6'>
                <p className='capitalize text-gray-500 mb-6 text-sm font-semibold sm:text-base'>
                    <Link to='/' className='transition hover:border-b-2 border-b-gray-500'>
                        Home
                    </Link>
                    <span className='px-2'>\</span>
                    {product.categoryName}
                    <span className='pl-2'>\</span>
                </p>
                <div className='flex flex-col justify-center items-center lg:flex lg:flex-row lg:justify-between lg:items-start'>
                    <div className='w-full shadow-lg rounded-md flex justify-center items-center lg:w-2/4 sm:w-3/4'>
                        <img className='w-2/4 lg:w-3/4' src={product.image} alt={product.name} />
                    </div>
                    <div className='w-full pl-0 sm:w-3/4 lg:w-2/4 lg:pl-[30px]'>
                        <div>
                            <p className='font-medium text-xl mt-5 lg:mt-0 md:text-2xl'>{product.name}</p>
                            <div className='flex justify-start'>
                                <div className='mr-4'>
                                </div>
                            </div>
                            <p className='text-base mt-4 sm:text-lg'>{product.description}</p>
                            <div className='my-4'>
                            </div>
                            {
                                priceList && priceList.map(_price => {
                                    const price = { ..._price, image: product.image , productName: product.name };
                                    const isInCart = cart.some(el => el.id === price.id);
                                    return (
                                        <button
                                            key={price.id}
                                            onClick={addProduct(price)}
                                            disabled={isInCart}
                                            className={`w-full bg-black mt-8 text-md rounded-md text-white transition px-[20px] py-[15px] mx-[10px] sm:text-lg md:w-fit ${isInCart ? 'border px-[40px] py-[10px] bg-gray-400' : 'hover:bg-gray-800'}`}
                                        >
                                            {
                                                isInCart
                                                    ? <> {price.unit} _ ${price.price}
                                                        <span className='ml-2'><FontAwesomeIcon icon={faCheck} /></span>
                                                    </>

                                                    : <> {price.unit} _ ${price.price}
                                                        <span className='ml-2'><FontAwesomeIcon icon={faCartShopping} /></span>
                                                    </>
                                            }
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='mt-[100px]'>
                    <p className='text-xl font-medium w-fit border-b-2 border-b-gray-500 mx-auto lg:mx-0'>You may also be interested</p>
                    <div className={`flex justify-start mt-8 overflow-x-auto lg:overflow-x-hidden ${filterProductFooter?.length > 3 ? 'lg:justify-center' : 'sm:justify-center'}`}>
                        {error && <div>{error.error}</div>}
                        {isLoading && <Loader />}
                        {
                            filterProductFooter?.map(product => (
                                <Link to={`/products/${product.id}`}
                                    onClick={() => clickHandler(product.id)}
                                    key={product.id}
                                    className='flex flex-col justify-evenly items-center border mx-1 py-1 rounded-lg shadow-lg productItem'
                                >
                                    <img className='w-[100px]' src={product.image} alt={product.name} />
                                    <div>
                                        <p className='w-[200px] text-center'>{product.name}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
