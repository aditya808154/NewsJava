// AuthSection.js

import React, { useState } from 'react';
import './AuthSection.css';

const AuthSection = () => {
    // State to toggle between Login and Signup modes
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            alert('Logging in...');
        } else {
            alert('Signing up...');
        }
        // Add your actual authentication logic here
    };

    const toggleMode = () => {
        setIsLogin(prev => !prev);
    };

    return (
        <div className="as-main-container">
            
            {/* Dark Header Section (Reusing the style pattern) */}
            <div className="as-dark-header">
                <header className="as-header-content">
                    <h1 className="as-main-heading">{isLogin ? 'Login' : 'Sign Up'}</h1>
                    <p className="as-breadcrumb">
                        daynightnews • {isLogin ? 'Login' : 'Sign Up'}
                    </p>
                </header>
            </div>
            
            {/* White Content Area */}
            <section className="as-auth-section-white">
                
                <h2 className="as-section-subtitle">
                    {isLogin 
                        ? 'अपने अकाउंट में लॉग इन करें।' 
                        : 'नया अकाउंट बनाने के लिए साइन अप करें।'}
                </h2>

                <div className="as-auth-form-container">
                    
                    <form onSubmit={handleSubmit} className="as-auth-form">
                        
                        {/* Signup fields (only show if not logging in) */}
                        {!isLogin && (
                            <div className="as-form-group">
                                <label htmlFor="username">यूज़रनेम</label>
                                <input type="text" id="username" name="username" required />
                            </div>
                        )}

                        <div className="as-form-group">
                            <label htmlFor="email">ईमेल पता</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        
                        <div className="as-form-group">
                            <label htmlFor="password">पासवर्ड</label>
                            <input type="password" id="password" name="password" required />
                        </div>

                        {/* Extra field for Signup */}
                        {!isLogin && (
                            <div className="as-form-group">
                                <label htmlFor="confirmPassword">पासवर्ड कन्फर्म करें</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required />
                            </div>
                        )}

                        <button type="submit" className="as-submit-button">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Footer Toggle */}
                    <div className="as-form-footer">
                        <p>
                            {isLogin ? 'क्या आपका अकाउंट नहीं है?' : 'क्या आपके पास पहले से ही अकाउंट है?'}
                            <button type="button" onClick={toggleMode} className="as-toggle-button">
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>

                </div>
            </section>
            
        </div>
    );
};

export default AuthSection;