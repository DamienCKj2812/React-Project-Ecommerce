import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId, //Hold the ID of another document in a Mongoose schema
        required: true, // ObjectIds that correspond to documents in the "User" model
        ref: "User", //reference
    },
},
    { timestamps: true }
);

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    quantity: {type: Number, required: true},
    category: {
        type: ObjectId, // Same as mongoose.Schema.Types.ObjectId, but commonly used when working directly with the MongoDB driver for low-level operations involving ObjectId instances.
        ref: "Category", //This specifies the model to which the ObjectId refers
        required: true,
    },
    description: {type: String, required: true},
    reviews: [reviewSchema], //reviews: This attribute defines an array of reviews within the productSchema.
    rating: {type: Number, required: true, default: 0},
    numReviews: {type: Number, required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    countInStock: {type: Number, required: true, default: 0},
},
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;