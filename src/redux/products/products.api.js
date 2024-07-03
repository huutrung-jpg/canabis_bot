import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {API_URL} from '../../constant';


export const productsApi = createApi({
    reducerPath: 'products/',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    // refetchOnFocus: true,
    endpoints: build => ({
        getProductsAll: build.query({
            query:() => ({
                url: '/product/GetAllProduct'
            })
        }),
        getProductById: build.query({
            query:(id) => ({
                url: `/product/GetProductById/${id}`
            })
        }),
        getProductByCategory: build.query({
            query:(categoryId) => ({
                url: `/product/GetProductsByCategoryId/${categoryId}`
            })
        }),
        getAllCategory: build.query({
            query:() => ({
                url: '/Category/GetAllCategory'
            })
        }),
        getPriceByProductId: build.query({
            query:(productId) => ({
                url: `/PriceForProduct/GetPriceForProduct/${productId}`
            })
        }),
    })
})

export const {
    useGetProductsAllQuery,
    useGetProductByIdQuery,
    useGetProductByCategoryQuery,
    useGetAllCategoryQuery,
    useGetPriceByProductIdQuery
} = productsApi
