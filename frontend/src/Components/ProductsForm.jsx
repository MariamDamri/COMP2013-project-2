//import react from "react"

export default function ProductsForm({
    formData,
    handleOnSubmit,
    handleOnChange,
    isEditing,
    register,
    handleSubmit, 
    errors,
}) {
    return (
        <div className="product-form">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div>
                <input
                type="text"
						name="productName"
						{
                            //if isEditing is true, then don't register the input fields
							...(isEditing
								? {}
								: register("productName", {
										required: "Product name is required",
                                        pattern: {
										 	value: /^[a-zA-Z\s]+$/,
										 	message: "Name should contain only alphabets",
										 },
								  }))
                                }
						
                        value={formData.productName}
						onChange={handleOnChange}
						placeholder="Name"
					/>
                    {errors.productName && (
                        <span style={{ color: "red" }}>{errors.productName.message}</span>
                    )}
                    </div>
				<div>
					<input
                    
                    type="text"
						name="brand"
						{...(isEditing
							? {}
							: register("brand", {
                                required: "Brand is required"
							  }))}
                 value={formData.brand}
				 onChange={handleOnChange}
				 placeholder="Brand"
				 />
                 {errors.brand && (
                    <span style={{ color: "red" }}>{errors.brand.message}</span>
                 )}

                </div>
				<div>
					<input

 				        type="text"
						name="image"
                        {...(isEditing
							? {}
							: register("image", {
									required: "Image URL is required",
									pattern: {
                                      //  value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, commenting this out for now because itsasking me for a real url and im just testing
										message: "Invalid URL"
									}
							  }))}
                              value={formData.image}
						onChange={handleOnChange}
						placeholder="Image URL"
					/>
					{errors.image && (
                         <span style={{ color: "red" }}>{errors.image.message}</span>
                    )}
				</div>
                <div>
                    <input
                    type="text"
						name="price"
						
						{...(isEditing
							? {}
							: register("price", {
									required: "Price is required",
                                      pattern: {
                                        // for things like price im not sure if i need i need any kind of pattern (like how 
                                        // its in the lecture for phone number) but it seems to work fine without so
                                        // i believ dont need it? price is taking any text as input
										//value: 
										
									 },
                                     }))}
                                     value={formData.price}
						onChange={handleOnChange}
						placeholder="Price"
					/>
                    {errors.price && (
                        <span style={{ color: "red" }}>{errors.price.message}</span>
                    )}
                    </div>
                    <button type="submit">
                        {isEditing ? "Update Product" : "Add Product"}
                        </button>
                        </form>
		</div>
	);
}

                                    





