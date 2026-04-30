import React from 'react';
import './SingleShopItem.css'; 

// Mock Data for a single product (ID and price are crucial)
const product = {
    id: 99, // ⭐ Added ID for cart functionality
    title: "The News Pro - Reporter's Signature Watch",
    tagline: "Track deadlines, not just time. Built for the field.",
    longDescription: [
        "Crafted with durable, anti-glare sapphire glass and a lightweight titanium casing, this watch is designed to withstand the rigors of field reporting. It features a custom internal timer to track interview lengths and press conference durations accurately.",
        "The minimalist black and red face ensures quick reading in any light. It is water-resistant up to 100 meters and comes with a lifetime warranty against internal defects. An essential accessory for every serious journalist."
    ],
    price: 199.99, // ⭐ Changed to number for cart logic
    displayPrice: "$199.99",
    stockStatus: "In Stock (Ships in 1-2 days)",
    features: ["Titanium Casing", "Sapphire Glass", "100m Water Resistant", "Custom Interview Timer"],
    imageUrl: "https://i.pinimg.com/736x/e3/52/c9/e352c9ef12be89214728da03ba30f5e3.jpg",
    galleryImages: [
        "https://i.pinimg.com/736x/dd/1d/03/dd1d033ec902392c7fc97287a31eb078.jpg",
        "https://i.pinimg.com/736x/dd/1d/03/dd1d033ec902392c7fc97287a31eb078.jpg",
        "https://i.pinimg.com/736x/dd/1d/03/dd1d033ec902392c7fc97287a31eb078.jpg",
    ],
    reviews: [
        {
            id: 1,
            author: "Ajay Sharma",
            rating: 5,
            date: "Dec 10, 2025",
            comment: "Excellent build quality! The timer feature is incredibly useful for tracking interviews accurately. Highly recommend to fellow reporters.",
        },
        {
            id: 2,
            author: "Priya Singh",
            rating: 4,
            date: "Nov 28, 2025",
            comment: "Stylish and tough. Only reason it's not a 5-star is that the strap can be a bit stiff initially. Great watch overall.",
        },
    ],
    averageRating: 4.8,
    reviewCount: 45,
};

// Function to render stars based on rating
const renderStars = (rating) => {
    const fullStar = '★';
    const emptyStar = '☆';
    const totalStars = 5;
    
    const roundedRating = Math.round(rating * 2) / 2;
    
    let stars = '';
    for (let i = 1; i <= totalStars; i++) {
        if (i <= roundedRating) {
            stars += fullStar; 
        } else {
            stars += emptyStar; 
        }
    }
    return <span className="ns-review-stars">{stars}</span>;
};


const SingleShopItem = () => {
    
    // ⭐ NEW: Add to Cart Functionality (Reused from Shop.js) ⭐
    const handleAddToCart = () => {
        const quantityInput = document.querySelector('.ns-quantity-input');
        const quantity = parseInt(quantityInput.value) || 1;
        
        const storedCart = localStorage.getItem('newsStoreCart');
        let cartItems = storedCart ? JSON.parse(storedCart) : [];

        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === product.id);

        if (existingItemIndex > -1) {
            // Item exists, increase quantity
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Item is new, add it
            cartItems.push({ 
                id: product.id, 
                title: product.title, 
                price: product.price, 
                quantity: quantity, 
                imageUrl: product.imageUrl // Important for Cart.js
            });
        }

        localStorage.setItem('newsStoreCart', JSON.stringify(cartItems));
        alert(`${quantity} x ${product.title} added to cart!`);
    };

    return (
        <div className="ns-single-product-container">
            <div className="ns-breadcrumb">
                <a href="/shop">Shop</a> / {product.title}
            </div>

            <div className="ns-product-wrapper">
                
                {/* 1. Image and Gallery Section */}
                <div className="ns-product-image-section">
                    <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="ns-product-main-image"
                    />
                    
                    <div className="ns-product-thumbnails">
                        {product.galleryImages.map((img, index) => (
                            <img 
                                key={index}
                                src={img} 
                                alt={`View ${index + 1}`} 
                                className="ns-thumbnail-image"
                            />
                        ))}
                    </div>
                </div>

                {/* 2. Details and CTA Section */}
                <div className="ns-product-details-section">
                    <h1 className="ns-product-title">{product.title}</h1>
                    <p className="ns-product-tagline">{product.tagline}</p>

                    {/* Rating Display */}
                    <div className="ns-review-summary">
                        {renderStars(product.averageRating)}
                        <span className="ns-average-rating">{product.averageRating}/5</span>
                        <span className="ns-review-count">({product.reviewCount} Reviews)</span>
                    </div>
                    
                    {/* Price */}
                    <div className="ns-product-price-box">
                        <span className="ns-product-price">{product.displayPrice}</span>
                        <span className="ns-product-stock">{product.stockStatus}</span>
                    </div>

                    <h3 className="ns-details-heading">Product Description</h3>
                    {product.longDescription.map((pText, index) => (
                        <p key={index} className="ns-product-description-text">{pText}</p>
                    ))}

                    {/* Features List */}
                    <h3 className="ns-details-heading">Key Features</h3>
                    <ul className="ns-product-features-list">
                        {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>

                    {/* Action Buttons */}
                    <div className="ns-product-actions">
                        <input type="number" defaultValue="1" min="1" className="ns-quantity-input" />
                        <button 
                            className="ns-add-to-cart-button"
                            onClick={handleAddToCart} // ⭐ Updated button
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Review Section Rendering */}
            <div className="ns-product-reviews">
                <h3 className="ns-details-heading">Customer Reviews</h3>
                
                {product.reviews.map((review) => (
                    <div key={review.id} className="ns-review-item">
                        <div className="ns-review-header">
                            <span className="ns-review-author">{review.author}</span>
                            <span className="ns-review-date">{review.date}</span>
                        </div>
                        <div className="ns-review-rating">
                            {renderStars(review.rating)}
                        </div>
                        <p className="ns-review-comment">{review.comment}</p>
                    </div>
                ))}

                <button className="ns-load-more-reviews-button">Load More Reviews</button>
            </div>
        </div>
    );
};

export default SingleShopItem;