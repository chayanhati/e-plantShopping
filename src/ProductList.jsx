import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import "./ProductList.css";
import CartItem from "./CartItem";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: 15,
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: 12,
        },
      ],
    },
  ];

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    setAddedToCart((prev) => ({
      ...prev,
      [product.name]: true,
    }));
  };

  return (
    <div>
      <div className="navbar">
        <h3>Paradise Nursery</h3>
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleCartClick}>Cart</button>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2>{category.category}</h2>

              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />

                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">
                      {plant.description}
                    </div>
                    <div className="product-cost">${plant.cost}</div>

                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name]
                        ? "Added"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;