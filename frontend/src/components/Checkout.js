import React from 'react';

import './Checkout.css'

function Checkout({step1, step2, step3, step4}) {
    return (
        <div className='row checkout'>
{/* if step1 exist make it active otherwise set it to empty string */}
            <div className={step1 ? "active" : ''}>Sign-In</div>
            <div className={step2 ? "active" : ''}>Shipping</div>
            <div className={step3 ? "active" : ''}>Payment</div>
            <div className={step4 ? "active" : ''}>Place Order</div>
        </div>
    )
};

export default Checkout;
