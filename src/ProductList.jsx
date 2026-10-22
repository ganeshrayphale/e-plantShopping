import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const thumb = (label, color) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">` +
      `<rect width="200" height="200" fill="${color}"/>` +
      `<text x="100" y="125" font-size="80" text-anchor="middle" fill="white" font-family="Arial">${label}</text>` +
      `</svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', cost: 15, description: 'Produces oxygen at night and removes toxins.', image: thumb('S', '#2e7d32') },
      { name: 'Spider Plant', cost: 12, description: 'Filters formaldehyde and xylene from the air.', image: thumb('Sp', '#388e3c') },
      { name: 'Peace Lily', cost: 18, description: 'Removes mold spores and purifies the air.', image: thumb('P', '#43a047') },
      { name: 'Boston Fern', cost: 20, description: 'Adds humidity and removes pollutants.', image: thumb('B', '#4caf50') },
      { name: 'Rubber Plant', cost: 17, description: 'Absorbs airborne chemicals easily.', image: thumb('R', '#2e7d32') },
      { name: 'Aloe Vera', cost: 14, description: 'Purifies air and soothes skin.', image: thumb('A', '#66bb6a') },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', cost: 20, description: 'Calming scent that helps with sleep.', image: thumb('L', '#7e57c2') },
      { name: 'Jasmine', cost: 18, description: 'Sweet floral scent that lifts the mood.', image: thumb('J', '#8e6bbf') },
      { name: 'Rosemary', cost: 15, description: 'Fragrant herb for cooking and freshness.', image: thumb('Ro', '#5c6bc0') },
      { name: 'Mint', cost: 12, description: 'Fresh, cooling scent and flavor.', image: thumb('M', '#26a69a') },
      { name: 'Lemon Balm', cost: 14, description: 'Lemon scent that helps ease stress.', image: thumb('LB', '#9ccc65') },
      { name: 'Gardenia', cost: 22, description: 'Rich, sweet blooms with a strong scent.', image: thumb('G', '#ab47bc') },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', cost: 25, description: 'Thrives in low light and little water.', image: thumb('Z', '#00796b') },
      { name: 'Pothos', cost: 10, description: 'Fast-growing vine that is hard to kill.', image: thumb('Po', '#00897b') },
      { name: 'Cast Iron Plant', cost: 21, description: 'Tolerates neglect and shade.', image: thumb('C', '#00695c') },
      { name: 'Jade Plant', cost: 13, description: 'Succulent that stores water in its leaves.', image: thumb('Ja', '#26a69a') },
      { name: 'Chinese Evergreen', cost: 19, description: 'Handles low light and dry air.', image: thumb('CE', '#4db6ac') },
      { name: 'Cactus', cost: 9, description: 'Needs very little water or care.', image: thumb('Ca', '#689f38') },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: '#2e7d32',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 5,
  };
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '24px',
    fontSize: '20px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  };

  return (
    <div>
      <nav style={navStyle}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Paradise Nursery</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={linkStyle} onClick={onHomeClick}>Home</button>
          <button style={linkStyle} onClick={() => setShowCart(false)}>Plants</button>
          <button style={linkStyle} onClick={() => setShowCart(true)} aria-label="Cart">
            🛒 Cart <span style={{ background: 'white', color: '#2e7d32', borderRadius: '12px', padding: '2px 9px', fontWeight: 'bold' }}>{totalItems}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: '20px 30px' }}>
          {plantsArray.map((group) => (
            <div key={group.category}>
              <h2 style={{ margin: '30px 0 15px', color: '#2e7d32' }}>{group.category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {group.plants.map((plant) => (
                  <div key={plant.name} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', background: 'white', textAlign: 'center' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px' }} />
                    <h3 style={{ margin: '10px 0 4px' }}>{plant.name}</h3>
                    <p style={{ fontSize: '14px', color: '#555', minHeight: '40px' }}>{plant.description}</p>
                    <p style={{ fontWeight: 'bold', margin: '8px 0' }}>${plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                      style={{
                        padding: '8px 14px',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        background: isInCart(plant.name) ? '#9e9e9e' : '#4caf50',
                        cursor: isInCart(plant.name) ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
