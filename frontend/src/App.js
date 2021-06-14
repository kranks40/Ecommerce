import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import CartScreen from "./screen/CartScreen";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import SigninScreen from "./screen/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screen/RegisterScreen";
import ShippingAddressScreen from "./screen/ShippingAddressScreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";
import OrderHistoryScreen from "./screen/OrderHistoryScreen";
import ProfileScreen from "./screen/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProductListScreen from "./screen/ProductListScreen";
import AdminRoute from "./components/AdminRoute";
import ProductEditScreen from "./screen/ProductEditScreen";
import OrderListScreen from "./screen/OrderListScreen";
import UserListScreen from "./screen/UserListScreen";
import UserEditScreen from "./screen/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screen/SellerScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screen/SearchScreen";
import { listProductCategories } from "./actions/productAction";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screen/MapScreen";
import DashboardScreen from "./screen/DashboardScreen";
import SupportScreen from "./screen/SupportScreen";
import ChatBox from "./components/ChatBox";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row search">
          <div>
            <button
              className="open-sidebar"
              type="button"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              SureBuy
            </Link>
          </div>
          
          <div className="search">
            {/* pass react router dom properties to the searchbox using render fuction  */}
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>

          <div>
            <Link to="/cart">
              {/* <i className="fa fa-shopping-basket"></i> */}
               <ShoppingCartOutlinedIcon style={{ fontSize: "35px" }} /> 
              {/* compare cartitem.length if it's greater than zero then render object  */}
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            
            {/* if userInfo does exist then render username with a link 
            if userInfo does not exist then render signin link  */}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}

            {/* If userInfo exist and if userInfo.isSeller is true then render seller menu  */}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>

                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}

            {/* create another conditional rendering by checking if userInfo and userInfo.isAdmin exist render a dropdown with admin title and links to admin  */}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>

                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>

                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>

                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>

                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* create aside elements of html5. set className conditional. If sidebar is open then set the class to open otherwise set class to empty string*/}
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategory ? (
              <LoadingBox></LoadingBox>
            ) : errorCategory ? (
              <MessageBox variant="danger">{errorCategory}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/pageNumber/:pageNumber" component={HomeScreen} />
          <Route path="/seller/:id" component={SellerScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/product/:id/edit" component={ProductEditScreen} exact />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
          <PrivateRoute path="/order/:id" component={OrderScreen} />
          <PrivateRoute path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute path="/map" component={MapScreen} />
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          />
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          />
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          />
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <AdminRoute path="/productlist" component={ProductListScreen} exact />
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <AdminRoute
            path="/orderlist/pageNumber/:pageNumber"
            component={OrderListScreen}
            exact
          />
          <AdminRoute path="/orderlist" component={OrderListScreen} exact />
          <AdminRoute path="/userlist" component={UserListScreen} />
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
          <AdminRoute path="/dashboard" component={DashboardScreen} />
          <AdminRoute path="/support" component={SupportScreen} />
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          />
          <SellerRoute path="/orderlist/seller" component={OrderListScreen} />
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>@2021 All right reserved</div>{" "}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
