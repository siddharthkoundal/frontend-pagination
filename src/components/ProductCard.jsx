const ProductCard = ({ title, image }) => {
  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={title} />
      <div>{title}</div>
    </div>
  );
};

export default ProductCard;
