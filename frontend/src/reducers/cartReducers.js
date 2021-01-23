import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
    case CART_ADD_ITEM:
     //gets item from payload to add to the cart   
    const item = action.payload; 
    //compares if items recently added to cart with existing items in the cart to see if it is already there
    const existItem = state.cartItems.find(x => x.product === item.product); 
    //if new item added with the same productId as the old item replace the old item for the new item
        if(existItem) {
            return {
                ...state, // all existing properties would reamin intact
                //cartitems would be updated with any new changes
                //to update map function is used. from map fuction other items would not be changed in the cart.
                //only update the items that already exist.
                //x.product is compared with existItem.product.
                //if they are equal x.product is not returned instead item is returned because,
                //it is the new value in the state.
                //if they are not equal then return x.product
                cartItems: state.cartItems.map((x) => 
                x.product === existItem.product ? item : x
                ),
            };
        } else {
            //if the item is new it would be added to cart
            //(...state.cartItems, item) simply adds what was existing
            //to what is new. meaning if 2 items existed and one more
            //is added then the cart would show 3 items in cart
            return { ...state, cartItems: [...state.cartItems, item] };
        }
        default:
            return state;
    }
};