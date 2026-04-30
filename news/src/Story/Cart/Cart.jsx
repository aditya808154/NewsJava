import React, { useState, useEffect } from 'react';
import './Cart.css'; // नई CSS फ़ाइल

// Mock Data (Initial items if local storage is empty)
const initialCartItems = [
    {
        id: 1,
        title: "Exclusive News Enthusiast Mug",
        price: 14.99,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/100x100/1a1a1a/cccccc?text=Mug",
    },
    {
        id: 2,
        title: "Premium Reporter's Notebook",
        price: 9.99,
        quantity: 2,
        imageUrl: "https://via.placeholder.com/100x100/dc2626/ffffff?text=Notebook",
    },
    {
        id: 3,
        title: "News Agency Cap",
        price: 19.50,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/100x100/333333/dc2626?text=Cap",
    },
];

const SHIPPING_FEE = 5.00;
const TAX_RATE = 0.08; // 8% tax rate

// Helper function to get cart from localStorage
const getInitialCart = () => {
    const storedCart = localStorage.getItem('newsStoreCart');
    return storedCart ? JSON.parse(storedCart) : initialCartItems;
};

const Cart = () => {
    const [cartItems, setCartItems] = useState(getInitialCart);
    const [subtotal, setSubtotal] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    // 1. Update localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('newsStoreCart', JSON.stringify(cartItems));
        
        const newSubtotal = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity, 0
        );
        const newTax = newSubtotal * TAX_RATE;
        const newGrandTotal = newSubtotal + newTax + SHIPPING_FEE;

        setSubtotal(newSubtotal);
        setTotalTax(newTax);
        setGrandTotal(newGrandTotal);
    }, [cartItems]);

    // Handle quantity change
    const handleQuantityChange = (itemId, newQuantity) => {
        const quantity = parseInt(newQuantity);
        if (quantity < 1 || isNaN(quantity)) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: quantity } : item
            )
        );
    };

    // Handle item removal
    const handleRemoveItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    // Function to navigate to checkout (assuming you use React Router or similar)
    const handleCheckout = () => {
        // In a real application, you would use navigate('/checkout');
        // For this demo, we'll just log and alert.
        console.log("Proceeding to Checkout with items:", cartItems);
        alert("Proceeding to Checkout! (Integration assumed)");
        // If using React Router, replace this with navigation
        // For example: history.push('/checkout');
    }


    return (
        <div className="ns-cart-container">
            <h2 className="ns-cart-main-title">🛒 Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="ns-empty-cart">
                    <p>Your cart is empty. <a href="/shop">Continue Shopping</a></p>
                </div>
            ) : (
                <div className="ns-cart-content-wrapper">
                    
                    {/* Cart Items List */}
                    <div className="ns-cart-items-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="ns-cart-item-card">
                                <img src={item.imageUrl} alt={item.title} className="ns-cart-item-image" />
                                
                                <div className="ns-item-details">
                                    <h3 className="ns-item-title">{item.title}</h3>
                                    <p className="ns-item-price">${item.price.toFixed(2)}</p>
                                </div>
                                
                                <div className="ns-item-quantity-control">
                                    <label>Qty:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => 
                                            handleQuantityChange(item.id, e.target.value)
                                        }
                                        className="ns-quantity-input"
                                    />
                                </div>
                                
                                <div className="ns-item-subtotal">
                                    <span className="ns-subtotal-label">Item Total:</span>
                                    <span className="ns-subtotal-amount">
                                        {(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>

                                <button 
                                    className="ns-remove-button"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="ns-order-summary">
                        <h3 className="ns-summary-title">Order Summary</h3>
                        
                        <div className="ns-summary-line">
                            <span>Subtotal ({cartItems.length} items)</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="ns-summary-line">
                            <span>Shipping</span>
                            <span>${SHIPPING_FEE.toFixed(2)}</span>
                        </div>
                        
                        <div className="ns-summary-line">
                            <span>Estimated Tax (8%)</span>
                            <span>${totalTax.toFixed(2)}</span>
                        </div>

                        <div className="ns-summary-total-line">
                            <span className="ns-total-label">Grand Total</span>
                            <span className="ns-total-amount">${grandTotal.toFixed(2)}</span>
                        </div>
                        
                        <button 
                            className="ns-checkout-button"
                            onClick={handleCheckout} 
                        >
                            Proceed to Checkout
                        </button>
                    </div>

                </div>
            )}
            
            <a href="/shop" className="ns-continue-shopping">← Continue Shopping</a>
        </div>
    );
};

export default Cart;