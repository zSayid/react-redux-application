import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../slice/cart.slice";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";




const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const handleCheckout = () => {
    if (user && items.length !== 0) {
      // Redirect to checkout page
      navigate("/checkout");      
    } else {
      // Redirect to login page
      navigate("/login");
    }

  }

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {items.length} items</h5>
              </div>
              <div className="card-body">
                {items.length === 0 ? (
                  <p>No items yet</p>
                ) : (
                  items.map((item) => (
                    <div className="row mb-4" key={item._id}>
                      {/* Product Image */}
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <img
                          src={item.image_url}
                          className="w-100 rounded"
                          alt={item.title}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                        <p>Brand: {item.brand}</p>
                        <p>Category: {item.category}</p>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => dispatch(removeFromCart(item._id))}
                        >
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      </div>

                      {/* Quantity + Price */}
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="d-flex align-items-center mb-3" style={{ maxWidth: "200px" }}>
                          <button
                            className="btn btn-primary"
                            onClick={() => dispatch(decreaseQuantity(item._id))}
                          >
                          <FiMinus />
                          </button>

                          <input
                            min="1"
                            value={item.quantity}
                            type="number"
                            readOnly
                            className="form-control text-center mx-2"
                            style={{ width: "60px" }}
                          />

                          <button
                            className="btn btn-primary px-3"
                            onClick={() => dispatch(increaseQuantity(item._id))}
                          >
                            <GoPlus />
                          </button>
                        </div>
                        <p className="text-start text-md-center">
                          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="card mb-4">
                <div className="card-body">
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => dispatch(clearCart())}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>${totalPrice.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Free</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <p className="mb-0">(including VAT)</p>
                    </div>
                    <span>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </span>
                  </li>
                </ul>

                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={handleCheckout}>
                {user && items.length !== 0  ?  "Go to Checkout" : "Login to Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
