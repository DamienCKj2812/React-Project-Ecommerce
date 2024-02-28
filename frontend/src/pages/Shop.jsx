import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice';

import { setCategories, setProducts, setChecked } from '../redux/features/shop/shopSlice';
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";


const Shop = () => {
    // State and dispatch setup
    const dispatch = useDispatch();
    const {categories,  products, checked, radio} = useSelector(state => state.shop);
    const categoriesQuery = useFetchCategoriesQuery();
    const [priceFilter, setPriceFilter] = useState("");

    // API query for filtered products
    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio,
    });

    // Effect to set categories in Redux state when categoriesQuery.data changes
    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, dispatch])

    // Effect to filter products based on checked categories and price filter
    useEffect(() => {
        if (!checked.length || !radio.length) { //This effect runs when either checked or radio changes. If both are not present, and if the filtered product query is not loading
            if (!filteredProductsQuery.isLoading) {
                // Filter products based on both checked categories and price filter
                const filteredProducts = filteredProductsQuery.data.filter(product => {
                    // Check if the product price includes the entered price filter value
                    return(
                        product.price.toString().includes(priceFilter) || // Converts the product.price to a string. This is done to make sure that the includes method,
                        product.price == parseInt(priceFilter, 10)  //Checks if the numeric value of product.price is equal to the parsed integer value of priceFilter.
                    )
                })

                // Dispatch the filtered products to Redux state
                dispatch(setProducts(filteredProducts));
            }
        }
    }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter])

    const handleBrandClick = brand => {
        const productsByBrand = filteredProductsQuery.data?.filter(
            product => product.brand == brand
        )
        dispatch(setProducts(productsByBrand))
    }

    const handleCheck = (value, id) => {
        const updatedChecked = value ? [...checked, id] : checked.filter(c => c != id)
        dispatch(setChecked(updatedChecked)) 
    }

    const handlePriceChange = e => {
        //Update the price filter state when the usertypes in the input field
        setPriceFilter(e.target.value)
    }

    //Add "All Brands" option to uniqueBrands
    const uniqueBrands = [
        ...Array.from( //spread the elements of the array created from the unique set into a new array named uniqueBrands
            new Set(filteredProductsQuery.data?.map(product => product.brand).filter( //It extracts the brand property from each product. By using Set object is used to create a collection of unique values. 
                                                                                      //It automatically removes duplicate values.
                brand => brand != undefined //This filters out any undefined values from the extracted brands.
            ))
        )
    ]

    return <>
        <div className="container mx-auto">
            <div className="flex md:flex-row lg:ml-[5rem]">
                <div className="bg-[#151515] p-3 mt-2 mb-2 text-white">
                    <h2 className="h4 text-center py-2 rounded-full mb-2 bg-black ">
                        Filter by Categories
                    </h2>

                    <div className="p-5 w-[15rem]">
                        {categories?.map(c => (
                            <div key={c._id} className="mb-2">
                                <div className="flex items-center mr-4">
                                    <input
                                        type="checkbox"
                                        id="red-checkbox"
                                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                                        className="w-4 h-4"
                                    />

                                    <label
                                        htmlFor="pink-checkbox"
                                        className="ml-2 text-sm font-medium text-slate-200"
                                    >
                                        {c.name}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                        Filter by Brands
                    </h2>

                    <div className="p-5">
                        {uniqueBrands?.map((brand) => (
                            <>
                                <div className="flex items-center mr-4 mb-5">
                                    <input 
                                        type="radio" 
                                        id={brand}
                                        name="brand" 
                                        onChange={() => handleBrandClick(brand)}
                                        className="w-4 h-4"
                                    />

                                    <label 
                                        htmlFor="pink-radio" 
                                        className="ml-2 text-sm font-medium text-white"
                                    >
                                        {brand}
                                    </label>
                                </div>
                            </>
                        ))}
                    </div>

                    <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                        Filter by Price
                    </h2>

                    <div className="p-5 w-[15rem]">
                        <input 
                            type="text" 
                            placeholder="Enter Price" 
                            value={priceFilter} 
                            onChange={handlePriceChange}
                            className="text-black w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
                        />
                    </div>

                    <div className="p-5 pt-0">
                        <button 
                            className="w-full border my-4" 
                            onClick={() => window.location.reload()}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="p-3">
                    <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
                    <div className="flex flex-wrap">
                        {products.length == 0 ? (
                            <Loader/>
                        ) : (
                            products?.map(p => (
                                <div className="p-3" key={p._id}>
                                    <ProductCard p={p} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Shop