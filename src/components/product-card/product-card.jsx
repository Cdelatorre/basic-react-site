import Button from "../button/button";

import './product-card.css'

const ProductCard = ({ product, action }) => {
  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt="caca" />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <small className="card-text">{product.price}</small>
        <Button action={action} type="info">
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
};


export default ProductCard;
