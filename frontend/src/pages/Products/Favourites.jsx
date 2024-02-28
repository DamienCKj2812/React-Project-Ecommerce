import { useSelector } from "react-redux"
import { selectFavouriteProduct } from '../../redux/features/favourites/favouriteSlice'
import Product from "./Product"



const Favourites = () => {
    const favourite = useSelector(selectFavouriteProduct);// access the current state of the "favourites" slice in your React component.

    return <div className="ml-[10rem]">
        <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
            FAVOURITE PRODUCTS
        </h1>

        <div className="flex flex-wrap">
            {favourite.map(product => (
                <Product key={product._id} product={product} /> 
            ))}
        </div>

    </div>

}

export default Favourites