import React from 'react';
import Slider from 'react-slick'; 
import './Shop.css';

// ... (Make sure you have installed react-slick and its CSS) ...

const shopItems = [
    {
        id: 1, // ⭐ Added ID for cart functionality
        title: "Exclusive News Enthusiast Mug",
        description: "Start your day with the latest headlines and your favorite beverage. This premium ceramic mug features our iconic news logo and a sleek, durable design.",
        price: 14.99, // ⭐ Changed to number for cart logic
        displayPrice: "$14.99",
        showDetails: "Limited Edition: Only 500 units available. Dishwasher safe. Perfect gift for journalists and news junkies.",
        imageUrl: "https://i.pinimg.com/736x/47/f3/db/47f3dbad463bb10c46dd7d788596d619.jpg" 
    },
    {
        id: 2, // ⭐ Added ID for cart functionality
        title: "Premium Reporter's Notebook",
        description: "High-quality, durable notebook perfect for capturing breaking news and essential interviews on the go. Features a soft-touch cover.",
        price: 9.99, // ⭐ Changed to number for cart logic
        displayPrice: "$9.99",
        showDetails: "A4 Size, 100 pages, ruled. Durable cover with subtle embossed logo. Essential gear for serious reporters.",
        imageUrl: "https://i.pinimg.com/736x/50/6d/97/506d97952fb5d7380153e8858483f6a8.jpg" 
    },
    
    {
        id: 3, // ⭐ Added ID for cart functionality
        title: "News Agency Cap",
        description: "Stylish black cap with embroidered logo. Perfect for fieldwork or casual wear.",
        price: 19.50, // ⭐ Changed to number for cart logic
        displayPrice: "$19.50",
        showDetails: "One size fits all. 100% cotton. Red and Black embroidered logo.",
        imageUrl: "https://i.pinimg.com/736x/c0/3c/26/c03c26c1a59695ab7141996d72826381.jpg"
    }
];

const Shop = () => {
    
    // ⭐ NEW: Add to Cart Functionality ⭐
    const handleAddToCart = (item) => {
        const storedCart = localStorage.getItem('newsStoreCart');
        let cartItems = storedCart ? JSON.parse(storedCart) : [];

        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex > -1) {
            // Item exists, increase quantity
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // Item is new, add it with quantity 1
            cartItems.push({ 
                id: item.id, 
                title: item.title, 
                price: item.price, 
                quantity: 1, 
                imageUrl: item.imageUrl // Important for Cart.js
            });
        }

        localStorage.setItem('newsStoreCart', JSON.stringify(cartItems));
        alert(`${item.title} added to cart!`);
    };

    // SLIDER SETTINGS
    const sliderSettings = {
        infinite: true,
    speed: 500,
    slidesToShow: 1, // Default 1 (Refresh fix)
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    mobileFirst: true, // CSS media queries ki tarah kaam karega
    responsive: [
      {
        breakpoint: 768, // Tablet
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 1024, // Desktop
        settings: { slidesToShow: 3 }
      }
    ],
    };

    return (
        <div className="ns-shop-container">
            <h2 className="ns-shop-main-title">The News Store: Featured Items</h2>
            
            
            <div className="ns-shop-slider-wrapper">
                
                <Slider {...sliderSettings}>
                    {shopItems.map((item, index) => (
                        
                        <div className="ns-shop-card-slide" key={index}> 
                            <div className="ns-shop-card">
                                
                                {/* Image Section */}
                                <div className="ns-shop-image-wrapper">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        className="ns-shop-item-image"
                                    />
                                </div>

                                {/* Details Section */}
                                <div className="ns-shop-details">
                                    <h3 className="ns-shop-item-title">{item.title}</h3>
                                    
                                    {/* Description */}
                                    <p className="ns-shop-item-description">
                                        {item.description}
                                    </p>
                                    
                                    {/* Price and Buy Button */}
                                    <div className="ns-shop-cta">
                                        <span className="ns-shop-item-price">{item.displayPrice}</span>
                                        <button 
                                            className="ns-shop-buy-button"
                                            onClick={() => handleAddToCart(item)} // ⭐ Updated button
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    {/* Additional Details */}
                                    <div className="ns-shop-show-details">
                                        <h4>Product Highlights</h4>
                                        <p>{item.showDetails}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            
            <a href="/Cart" className="ns-shop-view-all">View Cart →</a> {/* Updated link text */}
        </div>
    );
};

export default Shop;