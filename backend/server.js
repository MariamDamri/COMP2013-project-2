//initialize server 

const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose"); 
const cors = require("cors");
const Product = require("./models/product");
require("dotenv").config();
const { DB_URI } = process.env; //to grab smae variables from te dotenv file

//middleware

server.use(express.json()); //to insure data is transmitted as json
server.use(express.urlencoded({extended: true}));
server.use(cors());

//connecting to mongodb DB

mongoose
    .connect(DB_URI)
	.then(() => {
		server.listen(port, () => {
			console.log(`DB is connected\nServer is listening on ${port}`);
		});
	})
	.catch((error) => console.log(error.message));

//Routes
//Root route

server.get("/", (request, response) => {
  response.send("server is live!");
});

//getting data from products DB

server.get("/products", async (request, response) => {
	try {
		const product = await Product.find();
		response.send(product);
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
});

//add product to DB

server.post("/add-product", async (request, response) => {
	const { productName, brand, price, image } = request.body;
	const newProduct = new Product({
		productName,
		brand,
		price,
		image
	});
	try {
		await newProduct.save();
		response.status(201).json({ message: "Product added successfully" });
	} catch (error) {
		console.log(error);
		response.status(400).json({ message: error.message });
	}
});

//to delete a product from DB

server.delete("/products/:id", async (request, response) => {
	const { id } = request.params;
	const objectId = new mongoose.Types.ObjectId(id); 
	try {
		await Product.findByIdAndDelete(objectId);
		response.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		response.status(404).json({ message: error.message });
	}
});

//to edit in DB

server.patch("/products/:id", async (request, response) => {
	const { id } = request.params;
	const { productName, brand, price, image } = request.body;
	const objectId = new mongoose.Types.ObjectId(id); // Convert id to Mongoose ObjectId
	try {
		await Product.findByIdAndUpdate(id, {
			productName,
			brand,
			price,
			image
		}).then((response) => {
			console.log(response);
		});

		await response
        .status(200)
        .json({ message: "Product updated successfully" });
	} catch (error) {
		response.status(404).json({ message: error.message });
	}
});