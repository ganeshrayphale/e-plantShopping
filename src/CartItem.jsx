import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateItemTotal = (item) => item.cost * item.quantity;

  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  const buttonStyle = {
    width: '32px',
    height: '32px',
    fontSize: '18px',
    border: '1px solid #4caf50',
    background: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '20px 30px' }}>
      <h2 style={{ color: '#2e7d32' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 && <p style={{ margin: '20px 0' }}>Your cart is empty.</p>}

      <div>
        {cart.map((item) => (
          <div
            key={item.name}
            style={{ display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '12px', margin: '12px 0', background: 'white' }}
          >
            <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '6px' }} />
            <div style={{ flex: 1 }}>
              <h3>{item.name}</h3>
              <p>Unit price: ${item.cost}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
                <button style={buttonStyle} onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button style={buttonStyle} onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p>Total: ${calculateItemTotal(item)}</p>
            </div>
            <button
              onClick={() => handleRemove(item)}
              style={{ padding: '8px 14px', border: 'none', borderRadius: '5px', background: '#d32f2f', color: 'white', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
        <button
          onClick={onContinueShopping}
          style={{ padding: '10px 18px', border: 'none', borderRadius: '5px', background: '#4caf50', color: 'white', cursor: 'pointer' }}
        >
          Continue Shopping
        </button>
        <button
          onClick={handleCheckoutShopping}
          style={{ padding: '10px 18px', border: 'none', borderRadius: '5px', background: '#1565c0', color: 'white', cursor: 'pointer' }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
