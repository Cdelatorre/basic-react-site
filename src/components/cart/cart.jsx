import Button from "../button/button";

const Cart = ({ products = [], onDeleteProduct }) => {
  return (
    <div className="Cart">
      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>{product.title} - {product.price}$ <Button type="danger" action={() => onDeleteProduct(product.id)}>x</Button></li>
          )
        })}

        {!products.length && "No hay productos en el carrito"}
      </ul>
    </div>
  );
};

export default Cart;
