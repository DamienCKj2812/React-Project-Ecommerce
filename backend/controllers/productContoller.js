import asyncHandler from "../middlewares/asyncHandler.js";
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async(req, res) => {
    try {

        const {name, description, price, category, quantity, brand} = req.fields;
        
        //validation
        switch(true) {
            case !name:
                return res.json({error: "Name is required"});
            case !description:
                return res.json({error: "Description is required"});
            case !price:
                return res.json({error: "Price is required"});
            case !category:
                return res.json({error: "Category is required"});
            case !quantity:
                return res.json({error: "Quantity is required"});
            case !brand:
                return res.json({error: "Brand is required"});                               
        }

        const product = new Product({...req.fields});
        await product.save();
        res.json(product);


    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
}) 

const updateProductDetails = asyncHandler(async(req, res) => {
    try {
        const {name, description, price, category, quantity, brand} = req.fields;
        
        //validation
        switch(true) {
            case !name:
                return res.json({error: "Name is required"});
            case !description:
                return res.json({error: "Description is required"});
            case !price:
                return res.json({error: "Price is required"});
            case !category:
                return res.json({error: "Category is required"});
            case !quantity:
                return res.json({error: "Quantity is required"});
            case !brand:
                return res.json({error: "Brand is required"});                               
        }

        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true});
        await product.save();
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const removeProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error"});
    }
})

const fetchProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword 
            //This is the field in the MongoDB document (in this case, a product) that is being searched.
            //This is using a regular expression (regex) to search for any product names that match the given keyword. 
            //$options: "i": This option makes the search case-insensitive, meaning it will match product names regardless of whether they are in uppercase or lowercase.
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            } 
            : {}; //If no regular expression provided in URL it will show all the documents(products)

        const count = await Product.countDocuments({...keyword});  //The countDocuments() function in MongoDB returns the count of documents that would match a find() query
        const products = await Product.find({...keyword}).limit(pageSize); //The find() function returns all documents that match the conditions from the collection. 
                                                                           //The limit() function is used to limit the number of results returned from a query.

        res.json({
            products, 
            page: 1, //This indicates that the results correspond to the first page.
            pages: Math.ceil(count/pageSize), //calculating the total number of pages
            hasMore: false, //This indicates that there are no more products to be fetched
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Server error"});
    }
})

const fetchProductById =  asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            return res.json(product)
        } else {
            res.status(404);
            throw new Error("Product not found");
        }

    } catch (error) {
        console.error(error);
        res.status(404).json({error : "Product not found"})
    }
})

const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("category") //category field in each product document with the actual category details. This is beneficial when you have a reference to another collection (in this case, Category) and you want to retrieve the full details instead of just the ID.
            .limit(12) //It limits the number of products returned to 12. Only the first 12 products will be included in the response.
            .sort({ createdAt: -1 }); //It sorts the products based on the createAt field in descending order (-1)
  
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
  });

const addProductReview = asyncHandler(async(req, res) => {
    try {
        const {rating, comment} = req.body; //get rating and comment from user
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReview = product.reviews.find((r) => r.user.toString()
            === req.user._id.toString())  //In many databases, such as MongoDB, _id is an ObjectID, not a string. So, req.user._id.toString() is used to convert the ObjectID to a string for a proper comparison.
            
            if (alreadyReview){
                res.status(400)
                throw new Error("Product already reviewed")
            }

            const review = { //creating a new revciew object
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review); //Adding the Review to the Product
            product.numReviews = product.reviews.length;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length; //Calculating Average Rating                                                                                                                                           

            await product.save();
            res.status(201).json({message: "Review added"});
        } else {
            res.status(404);
            throw new Error ("Product not found");
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const fetchTopProduct = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const fetchNewProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find().sort({_id: -1}).limit(5);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const filterProducts = asyncHandler(async (req, res) => {
    try {
        const {checked, radio} = req.body;

        let args = {}; //This object will be used to build the criteria for filtering products.
        if (checked.length > 0) args.category = checked; //If there are items in the checked array, it adds a category property to the args object with the value of the checked 
                                                         //array. This implies that products must belong to at least one of the specified categories.

        if (radio.length) args.price = {$gte: radio[0], $lte: radio[1]}; //If the radio array has elements, it adds a price property to the args object with a MongoDB query object. 
                                                                         //This query is checking for products with a price greater than or equal to radio[0] and less than or equal to radio[1].
                                                                         //This is for the customer to set the price range

        const products = await Product.find(args);
        res.json(products);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server Error"})
    }
})



export {addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProduct, fetchNewProduct, filterProducts};