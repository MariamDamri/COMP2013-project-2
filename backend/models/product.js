const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
   // id: {
   //    type: String,
   //    required: true
   // }, since mangodb creates the id itself for each thing
    productName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;