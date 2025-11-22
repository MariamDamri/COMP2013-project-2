import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  _id,
  handleDelete,
  handleEdit,

}) {
  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt="" />
      <h4>{brand}</h4>

      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={_id}
        mode="product"
      />

      <h3>${price}</h3>
      <button onClick={() => handleAddToCart(_id)}>Add to Cart</button>
      <button onClick={() => handleEdit({ _id, productName, brand, image, price })}> Edit</button> 
      <button onClick={() => handleDelete(_id)}>Delete</button>
			
    </div>
    //tried changing the color of delete button but it made delete button stopped working so im lweaving it as it was hoping is fine if the button is not colored
  );
}


