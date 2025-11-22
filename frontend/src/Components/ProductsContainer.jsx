import ProductCard from "./ProductCard";

export default function ProductsContainer({
  handleEdit,
  handleDelete,
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productQuantity,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => (
        <ProductCard
          key={product._id} //changinfd .id to ._id cause because mangodb gives _id for each thing
          {...product}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={
            productQuantity.find((p) => p._id === product._id).quantity
          }
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}
