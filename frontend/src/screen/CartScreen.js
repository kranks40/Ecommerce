import React from 'react'

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]): 1;
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>
                Add to Cart : ProductID: {productId} Qty: {qty}
            </p>
        </div>
    )
};

export default CartScreen;
