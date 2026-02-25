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
      { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Improves air quality.", cost: 15 },
      { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Removes toxins.", cost: 12 },
      { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Purifies air.", cost: 18 },
      { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity.", cost: 20 },
      { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Removes toxins.", cost: 17 },
      { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Heals and purifies.", cost: 14 }
    ]
  },

  {
    category: "Aromatic Fragrant Plants",
    plants: [
      { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/11/29/05/08/lavender-1869301_1280.jpg", description: "Calming scent.", cost: 20 },
      { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/05/17/17/25/jasmine-2324350_1280.jpg", description: "Sweet fragrance.", cost: 18 },
      { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Aromatic herb.", cost: 15 },
      { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma.", cost: 12 },
      { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Stress relief.", cost: 14 },
      { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Fragrant flower.", cost: 22 }
    ]
  },

  {
    category: "Medicinal Plants",
    plants: [
      { name: "Tulsi", image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg", description: "Boosts immunity.", cost: 10 },
      { name: "Neem", image: "https://cdn.pixabay.com/photo/2017/05/08/15/19/neem-2291966_1280.jpg", description: "Natural purifier.", cost: 16 },
      { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", description: "Promotes sleep.", cost: 15 },
      { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", description: "Relieves headaches.", cost: 13 },
      { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", description: "Immune booster.", cost: 16 },
      { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg", description: "Skin healer.", cost: 12 }
    ]
  }
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
