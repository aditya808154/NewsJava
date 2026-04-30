import React, { useState, useEffect } from 'react';
import './Checkout.css';

const SHIPPING_FEE = 5.00;
const TAX_RATE = 0.08; 

// Helper function to get cart from localStorage
const getCartData = () => {
    const storedCart = localStorage.getItem('newsStoreCart');
    const items = storedCart ? JSON.parse(storedCart) : [];
    
    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    );
    const totalTax = subtotal * TAX_RATE;
    const grandTotal = subtotal + totalTax + SHIPPING_FEE;
    
    return { 
        items, 
        totals: { subtotal, totalTax, grandTotal }
    };
};

const Checkout = () => {
    
    const { items: cartItems, totals } = getCartData(); // Use live cart data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: 'India',
        paymentMethod: 'creditCard', // Default selection
        cardNumber: '',
        upiVpa: '', 
    });

    // Check if cart is empty on mount (important for checkout page)
    useEffect(() => {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
            // In a real app, you would redirect: history.push('/cart');
        }
    }, [cartItems.length]); // Re-run check if cart changes

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            alert("Cannot place order. Your cart is empty.");
            return;
        }

        // Basic Form Validation (Add more complex validation as needed)
        if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.zip) {
            alert("Please fill in all required shipping fields.");
            return;
        }

        if (formData.paymentMethod === 'creditCard' && !formData.cardNumber) {
            alert("Please enter card details.");
            return;
        }
        
        if (formData.paymentMethod === 'upi' && !formData.upiVpa) {
            alert("Please enter UPI VPA for payment.");
            return;
        }
        
        // --- Successful Submission (Mock) ---
        console.log("Submitting Order:", { ...formData, cart: cartItems, totals });
        alert(`Order Placed Successfully! Payment Method: ${formData.paymentMethod}. Total: $${totals.grandTotal.toFixed(2)}`);
        
        // Clear the cart after successful order placement (in a real scenario, this happens after server confirmation)
        localStorage.removeItem('newsStoreCart');
        // Redirect to Order Confirmation page 
        // Example: history.push('/order-confirmation');
    };

    if (cartItems.length === 0) {
        return (
            <div className="ns-checkout-container">
                <h2 className="ns-checkout-main-title">Checkout</h2>
                <div className="ns-empty-cart-checkout">
                    <p>Your cart is empty. Please <a href="/shop">add items</a> to proceed.</p>
                </div>
            </div>
        );
    }


    return (
        <div className="ns-checkout-container">
            <h2 className="ns-checkout-main-title">Checkout</h2>
            
            <form onSubmit={handleSubmit} className="ns-checkout-form-wrapper">
                
                {/* ---------------- 1. Shipping Information Section ---------------- */}
                <div className="ns-shipping-section">
                    <h3 className="ns-checkout-step-title">1. Shipping Information</h3>
                    
                    <div className="ns-form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    
                    <div className="ns-form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    
                    <div className="ns-form-group">
                        <label htmlFor="address">Address Line</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    
                    <div className="ns-form-row">
                        <div className="ns-form-group half-width">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="ns-form-group half-width">
                            <label htmlFor="zip">Postal Code</label>
                            <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="ns-form-group">
                        <label htmlFor="country">Country</label>
                        <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                        </select>
                    </div>

                </div>

                {/* ---------------- 2. Payment Method Section ---------------- */}
                <div className="ns-payment-section">
                    <h3 className="ns-checkout-step-title">2. Payment Method</h3>
                    
                    <div className="ns-payment-options">
                        <label className="ns-payment-option-label">
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="creditCard" 
                                checked={formData.paymentMethod === 'creditCard'} 
                                onChange={handleChange} 
                            />
                            Credit/Debit Card
                        </label>
                        
                        <label className="ns-payment-option-label">
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="upi" 
                                checked={formData.paymentMethod === 'upi'} 
                                onChange={handleChange} 
                            />
                            UPI (Google Pay, PhonePe, etc.)
                        </label>
                        
                        <label className="ns-payment-option-label">
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="cod" 
                                checked={formData.paymentMethod === 'cod'} 
                                onChange={handleChange} 
                            />
                            Cash on Delivery (COD)
                        </label>
                    </div>

                    {/* --- Conditional Payment Fields --- */}
                    
                    {/* 1. Credit Card Fields */}
                    {formData.paymentMethod === 'creditCard' && (
                        <div className="ns-card-details-form">
                            <p className="ns-payment-info">Enter your card details securely.</p>
                            <div className="ns-form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input 
                                    type="text" 
                                    id="cardNumber" 
                                    name="cardNumber" 
                                    value={formData.cardNumber} 
                                    onChange={handleChange} 
                                    required
                                    placeholder="XXXX XXXX XXXX XXXX"
                                />
                            </div>
                            {/* ... Add Expiry and CVV fields here ... */}
                        </div>
                    )}
                    
                    {/* 2. UPI Fields */}
                    {formData.paymentMethod === 'upi' && (
                        <div className="ns-upi-details-form">
                            <p className="ns-payment-info">Enter your UPI VPA (Virtual Payment Address).</p>
                            <div className="ns-form-group">
                                <label htmlFor="upiVpa">UPI VPA (e.g., username@bank)</label>
                                <input 
                                    type="text" 
                                    id="upiVpa" 
                                    name="upiVpa" 
                                    value={formData.upiVpa} 
                                    onChange={handleChange} 
                                    required
                                    placeholder="yourname@bankname"
                                />
                            </div>
                            <p className="ns-note">You will receive a payment request on this VPA after placing the order.</p>
                        </div>
                    )}

                    {/* 3. COD Message */}
                    {formData.paymentMethod === 'cod' && (
                        <div className="ns-cod-message">
                            <p className="ns-payment-info">
                                You have selected **Cash on Delivery (COD)**. 
                                Please ensure you have the exact amount ready at the time of delivery.
                            </p>
                            <p className="ns-note">A small processing fee may apply (not reflected in this demo).</p>
                        </div>
                    )}

                </div>

                {/* ---------------- 3. Order Summary and Final CTA ---------------- */}
                <div className="ns-summary-section">
                    <h3 className="ns-checkout-step-title">3. Order Summary</h3>
                    
                    <div className="ns-checkout-items-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="ns-checkout-item">
                                <span>{item.title} (x{item.quantity})</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="ns-checkout-breakdown">
                        <div className="ns-summary-line">
                            <span>Subtotal</span>
                            <span>${totals.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="ns-summary-line">
                            <span>Shipping Fee</span>
                            <span>${SHIPPING_FEE.toFixed(2)}</span>
                        </div>
                        <div className="ns-summary-line tax">
                            <span>Tax (8%)</span>
                            <span>${totals.totalTax.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="ns-checkout-total">
                        <span className="ns-total-label">Grand Total</span>
                        <span className="ns-total-amount">${totals.grandTotal.toFixed(2)}</span>
                    </div>

                    <button type="submit" className="ns-place-order-button">
                        Place Order (${totals.grandTotal.toFixed(2)})
                    </button>
                    
                    <p className="ns-security-note">Secure payment via SSL.</p>
                </div>

            </form>
        </div>
    );
};

export default Checkout;