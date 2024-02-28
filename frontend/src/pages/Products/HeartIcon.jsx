import {FaHeart, FaRegHeart} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavourites, removeFromFavourites, setFavourites } from '../../redux/features/favourites/favouriteSlice'
import { addFavouriteToLocalStorage, getFavouritesFromLocalStorage, removeFavouritesFromLocalStorage } from '../../Utils/localStorage'
import { useEffect } from 'react';



const HeartIcon = ({product}) => {
    const dispatch = useDispatch();
    const favourites = useSelector(state => state.favourites) || []; //selects the favourites slice from the Redux store state
    const isFavourite = favourites.some(p => p._id == product._id)

    useEffect(() => {
        const favouritesFromLocalStorage = getFavouritesFromLocalStorage();
        dispatch(setFavourites(favouritesFromLocalStorage));
    }, [])

    const toggleFavourites = () => {
        if(isFavourite) {
            // Filter out those removed product
            dispatch(removeFromFavourites(product));
            // remove the product from the localStorage
            removeFavouritesFromLocalStorage(product._id);
        } else {
            // Show the added favourite product
            dispatch(addToFavourites(product));
            // Add the product to localStorage as well
            addFavouriteToLocalStorage(product);
        }
    }

    return( 
        <div onClick={toggleFavourites} className='absolute top-2 right-5 cursor-pointer'>
            {isFavourite ? (
                <FaHeart className='text-pink-500' />
            ) : (
                <FaRegHeart className='text-white'/>
            )}

        </div>
    )
}

export default HeartIcon