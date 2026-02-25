import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleRemove = (name) => {
    dispatch(removeFromCart(name));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.cost * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} width="80" />
            <div>
              <h4>{item.name}</h4>
              <p>Price: ${item.cost}</p>

              <div className="quantity-controls">
                <button onClick={() => handleDecrease(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item)}>+</button>
              </div>

              <p>Subtotal: ${item.cost * item.quantity}</p>

              <button onClick={() => handleRemove(item.name)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <h3>Total Cart Amount: ${calculateTotal()}</h3>

      <button onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CartItem;
