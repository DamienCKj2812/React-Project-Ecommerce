import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Header from "./components/Header";
import Product from "./pages/Products/Product";



const Home = () => {
    const {keyword} = useParams();
    const {data, isLoading, isError}  = useGetProductsQuery({ keyword });
    
    return (
        <>
            {!keyword ? <Header/> : null}

            {isLoading ? (<Loader />) : isError ? (//If isLoading is true, it renders the Loader component.
            <Message variant='danger'> 

                {isError?.data.message || isError.error} {/*If isLoading is false, it checks if isError is true. If isError is true, it renders a Message component with a 'danger' variant. 
                                                            The content of the message is determined by the condition isError?.data.message || isError.error. */}

            </Message> ) : ( //If both isLoading and isError are false, it renders a fragment (<> ... </>) 

                <>
                    <div className="flex justify-between items-center">
                        <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
                            Special Products
                        </h1>

                        <Link to='/shop' className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]">
                            Shop
                        </Link>
                    </div>

                    <div>
                        <div className="flex justify-center flex-wrap mt-[2rem]">
                            {data.products.map((product) => (
                                <div key={product._id}>
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Home;