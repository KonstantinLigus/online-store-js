import CartItem from "../CartItem/CartItem";

const CartItems = ({
  cart,
  removeFromCart,
  updateCartItem,
  listStyles,
  itemStyles,
}) => (
  <ul className={listStyles}>
    {cart?.map(item => (
      <CartItem
        className={itemStyles}
        key={item._id}
        item={item}
        removeFromCart={removeFromCart}
        updateCartItem={updateCartItem}
      />
    ))}
  </ul>
);

export default CartItems;
