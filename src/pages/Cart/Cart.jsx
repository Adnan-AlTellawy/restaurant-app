import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <span>Items</span>
          <span>Title</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span>Remove</span>
        </div>
        <hr />
        {food_list
          .filter((item) => cartItems[item._id] > 0)
          .map((item) => (
            <div className="cart-item-row" key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt={item.name} />
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price" data-label="Price">
                  ${item.price}
                </p>
                <p className="cart-item-quantity" data-label="Quantity">
                  {cartItems[item._id]}
                </p>
                <p className="cart-item-total" data-label="Total">
                  ${item.price * cartItems[item._id]}
                </p>
                <button
                  type="button"
                  onClick={() => removeFromCart(item._id)}
                  className="cross"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ×
                </button>
              </div>
              <hr />
            </div>
          ))}
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  $
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button type="button" onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button type="button">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
