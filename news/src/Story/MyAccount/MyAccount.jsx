import React, { useState } from 'react';
import './MyAccount.css';

// Mock Data
const userProfile = {
    fullName: "Rakesh Sharma",
    email: "rakesh.sharma@example.com",
    phone: "+91 98765 43210",
    memberSince: "Jan 2024",
};

const ordersHistory = [
    { id: 'ORD1001', date: 'Dec 1, 2025', total: 49.97, status: 'Delivered', items: 2 },
    { id: 'ORD1002', date: 'Nov 15, 2025', total: 19.50, status: 'Shipped', items: 1 },
    { id: 'ORD1003', date: 'Oct 20, 2025', total: 75.00, status: 'Cancelled', items: 3 },
];

const addresses = [
    { id: 1, type: 'Home', recipient: userProfile.fullName, line1: '123, News Street, Sector 10', city: 'Noida', zip: '201301', country: 'India' },
    { id: 2, type: 'Work', recipient: 'Office Manager', line1: '404, Press Tower, MG Road', city: 'Gurgaon', zip: '122002', country: 'India' },
];

// --- Sub-Components for Different Views ---

const ProfileDetails = ({ profile }) => (
    <div className="ns-profile-details">
        <div className="ns-profile-card">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Member Since:</strong> {profile.memberSince}</p>
            <button className="ns-edit-button">Edit Profile</button>
        </div>
    </div>
);

const OrderHistory = ({ orders }) => (
    <div className="ns-order-history">
        <h3>Your Orders</h3>
        {orders.map(order => (
            <div key={order.id} className={`ns-order-item ns-status-${order.status.toLowerCase()}`}>
                <div className="ns-order-header">
                    <span className="ns-order-id">Order ID: **{order.id}**</span>
                    <span className="ns-order-date">Date: {order.date}</span>
                </div>
                <div className="ns-order-body">
                    <p>Total Items: {order.items}</p>
                    <p className="ns-order-total">Total Paid: **${order.total.toFixed(2)}**</p>
                    <span className="ns-order-status">{order.status}</span>
                </div>
                <button className="ns-view-details-button">View Details</button>
            </div>
        ))}
    </div>
);

const AddressBook = ({ addresses }) => (
    <div className="ns-address-book">
        <h3>Manage Addresses</h3>
        <button className="ns-add-address-button">➕ Add New Address</button>
        <div className="ns-addresses-grid">
            {addresses.map(addr => (
                <div key={addr.id} className="ns-address-card">
                    <span className="ns-address-type">{addr.type}</span>
                    <p><strong>{addr.recipient}</strong></p>
                    <p>{addr.line1}</p>
                    <p>{addr.city}, {addr.zip}</p>
                    <p>{addr.country}</p>
                    <div className="ns-address-actions">
                        <button className="ns-link-button">Edit</button> | 
                        <button className="ns-link-button delete">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Main MyAccount Component ---

const MyAccount = () => {
    // State to track the currently active section
    const [activeSection, setActiveSection] = useState('profile');

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileDetails profile={userProfile} />;
            case 'orders':
                return <OrderHistory orders={ordersHistory} />;
            case 'addresses':
                return <AddressBook addresses={addresses} />;
            case 'settings':
                return <div><h3>Settings</h3><p>Manage notifications, passwords, and security here.</p></div>;
            default:
                return <ProfileDetails profile={userProfile} />;
        }
    };

    return (
        <div className="ns-myaccount-container">
            <h2 className="ns-myaccount-main-title">👤 My Account</h2>
            
            <div className="ns-account-wrapper">
                
                {/* Sidebar Navigation */}
                <div className="ns-sidebar-nav">
                    <div 
                        className={`ns-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveSection('profile')}
                    >
                        Profile & Details
                    </div>
                    <div 
                        className={`ns-nav-item ${activeSection === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveSection('orders')}
                    >
                        Order History
                    </div>
                    <div 
                        className={`ns-nav-item ${activeSection === 'addresses' ? 'active' : ''}`}
                        onClick={() => setActiveSection('addresses')}
                    >
                        Address Book
                    </div>
                    <div 
                        className={`ns-nav-item ${activeSection === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveSection('settings')}
                    >
                        Account Settings
                    </div>
                    <div className="ns-nav-item logout">
                        Logout
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="ns-content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MyAccount;