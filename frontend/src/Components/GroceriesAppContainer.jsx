//importing files

import { useState, useEffect } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import ProductsForm from "./ProductsForm";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function GroceriesAppContainer() {

//seeting up data from the DB
const [products, setProducts] = useState([]);

const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  //
  const [postResponse, setPostResponse] = useState("");
  //for editing the data in DB
  const [isEditing, setIsEditing] = useState(false);

  //useEffect
	useEffect(() => {
		handleProductsDB();
	}, []);

  // React Hook Form
  	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

  //handlers 
  //getting data from DB

	const handleProductsDB = async () => {
		try {
			const response = await axios.get("http://localhost:3000/products");
			setProducts(response.data);
//
   setProductQuantity(
      response.data.map((p) => ({
        _id: p._id,
        quantity: 0
      }))
    );


//

		} catch (error) {
			console.log(error.message);
		}
	};

// Handling form data
	const handleOnchange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handling form submission
	const handleOnSubmit = async () => {

		//e.preventDefault(); i think this is preventing the page from reloading so i commented out to test something and when i added back the page doesnt reload for some reason after adding products

		try {
			if (isEditing) {
				//If isEditing is true, then update the product
				try {
					await handleUpdate(formData._id); //updatE the product
					await setIsEditing(false); // Set isEditing to false
					await setFormData({
						productName: "",
						brand: "",
						image: "",
						price: ""
					});
				} catch (error) {
					console.log(error.message);
				}
			} else {


				// If isEditing is false, then add the product
				await axios.post("http://localhost:3000/add-product", formData)
        .then((response) => {
					setPostResponse(response.data.message);
				});
				setFormData({ productName: "", brand: "", image: "", price: "" });
				handleProductsDB(); // refresh
			}
		} catch (error) {
			console.log(error.message);
		}
	};
  
  //handling edit product
	const handleEdit = async (product) => {
		console.log("Editing:", product);
		setIsEditing(true);
		setFormData({
			productName: product.productName,
			brand: product.brand,
			image: product.image,
			price: parseFloat(product.price.replace("$","")).toFixed(2),
			_id: product._id
		});
	};
  const [cartList, setCartList] = useState([]);

//re

const [productQuantity, setProductQuantity] = useState([]);


//quantity of items 
  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };
//handling the quanitity of items in the cart 
  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product._id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product._id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };
  //chng all .id to _.id 
// adding items to the cart
  const handleAddToCart = (productId) => {
    const product = products.find((product) => product._id === productId);
    const pQuantity = productQuantity.find(
      (product) => product._id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product._id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.name}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product._id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };


  //

  	// Handling update product in the database by id
	const handleUpdate = async (id) => {
		try {
			await axios.patch(`http://localhost:3000/products/${id}`, formData).then((response) => {
				setPostResponse(response.data.message);
			});
			handleProductsDB();
			
      // setPostResponse("Product updated successfully");
		} catch (error) {
			console.log(error.message);
		}
	};

    	// Handling delete product from the database by id
	const handleDelete = async (id) => {
		try {
			await axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
				setPostResponse(response.data.message);
			});
       handleProductsDB(); //handling the deletation of products.. this is what actyually makes the delete button work.
			 setPostResponse("Product deleted successfully");

		} catch (error) {
			console.log(error.message);
		}
	};

  return (
    <div>
      <NavBar quantity={cartList.length} />
      <h1>Products Form</h1>
      <ProductsForm
      formData={formData}
      handleOnChange={handleOnchange}
      handleOnSubmit={handleOnSubmit}
      isEditing={isEditing}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      />

      <div className="GroceriesApp-Container">
        <ProductsContainer
          products={products}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />

        <p style={{ color: "green" }}>{postResponse}</p>

        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
