import { useEffect, useRef, useState } from "react";
import "../../styles/cart.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const email = useSelector((state) => state.auth.email);
  const shippingRate = 15.0;
  const taxRate = 0.05;

  useEffect(() => {
    console.log("re-rendering");
    axios
      .get(`http://localhost:5000/api/getCartProducts/${email}`)
      .then((res) => {
        if (res) {
          setCartProduct(() =>
            res.data.map((item) => ({
              ...item,
              quantity: 1,
              totalPrice: item.price,
            }))
          );
        }
      })
      .catch((err) => {
        toast.error("Error in getting card product!");
      });
  }, []);

  const removeCartItem = (product) => {
    axios
      .delete(`http://localhost:5000/api/deleteCartProduct/${product._id}`)
      .then((res) => {
        if (res) {
          toast.success("Product removed from cart.");
          setCartProduct(
            cartProduct.filter((item) => item._id !== product._id)
          );
        }
      })
      .catch((err) => {
        toast.error("Error in removing product from cart.");
      });
  };

  const handleCounter = (e, cartItem) => {
    console.log(typeof e.target.value);
    if (Number(e.target.value) === 0) {
      removeCartItem(cartItem);
    }
    if (Number(e.target.value) === 10) {
      toast.warning("Maximum 10 quantity can be added.");
    }

    setCartProduct((prevState) =>
      prevState.map((item) =>
        item._id === cartItem._id
          ? {
              ...item,
              quantity: e.target.value,
              totalPrice: e.target.value * item.price,
            }
          : item
      )
    );
  };

  const navigate = useNavigate();

  const productDetail = (product) => {
    navigate(`/product/${product.productId}`);
  };

  return (
    <div className="product-list">
      <div className="shopping-cart">
        {cartProduct.map((cartItem) => (
          <div className="cart-product" key={cartItem._id}>
            <div className="cart-product-image">
              <img
                src={cartItem.image}
                onClick={() => productDetail(cartItem)}
                alt={cartItem.productName}
              />
            </div>
            <div className="cart-product-details">
              <div className="cart-product-title">{cartItem.productName}</div>
              <p className="cart-product-description">{cartItem.description}</p>
            </div>
            <div className="cart-product-price">{cartItem.price + " Rs"}</div>
            <div className="cart-product-count">
              <input
                type="number"
                value={cartItem.quantity}
                onChange={(e) => handleCounter(e, cartItem)}
                min="0"
                max="10"
              />
            </div>
            <div className="cart-product-removal">
              <button
                className="cart-remove-product"
                onClick={() => removeCartItem(cartItem)}
              >
                Remove
              </button>
            </div>
            <div className="cart-product-price">
              {cartItem.totalPrice + " Rs"}
            </div>
          </div>
        ))}

        {cartProduct.length > 0 ? (
          <div className="cart-totals">
            <div className="cart-totals-item">
              <label>Subtotal</label>
              <div className="cart-totals-value">
                {cartProduct
                  .reduce((total, item) => total + item.totalPrice, 0)
                  .toFixed(2) + " Rs"}
              </div>
            </div>
            <div className="cart-totals-item">
              <label>Tax (5%)</label>
              <div className="cart-totals-value">
                {(
                  cartProduct.reduce(
                    (total, item) => total + item.totalPrice,
                    0
                  ) * taxRate
                ).toFixed(2) + " Rs"}
              </div>
            </div>
            <div className="cart-totals-item">
              <label>Shipping</label>
              <div className="cart-totals-value">{shippingRate + " Rs"}</div>
            </div>
            <div className="cart-totals-item">
              <label>Grand Total</label>
              <div className="cart-totals-value">
                {(
                  cartProduct.reduce(
                    (total, item) => total + item.totalPrice,
                    0
                  ) +
                  cartProduct.reduce(
                    (total, item) => total + item.totalPrice,
                    0
                  ) *
                    taxRate +
                  shippingRate
                ).toFixed(2) + " Rs"}
              </div>
            </div>
            <button className="cart-checkout">Checkout</button>
          </div>
        ) : (
          <img
            onClick={() => {
              navigate("/");
            }}
            style={{ width: "850px", height: "500px" }}
            src={"no.jpg"}
            alt="no product in cart"
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
