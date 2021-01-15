1.	Introduction to this course
i.	what you will build
ii.	what you will learn
iii.	who are audiences

2.	Install Tools
i.	Code Editor
ii.	Web Browser
iii.	VS Code Extension

3.	Website Template
i.	Create amazona folder
ii.	create template folder
iii.	create index.html
iv.	add default HTML code
v.	link to style.css
vi.	create header, main and footer
vii.	style elements

4.	Display Products
i.	create products div
ii.	add product attributes
iii.	add link, image, name and price

5.	Create React App
i.	npx create-react-app frontend
ii.	npm start
iii.	Remove unused files
iv.	copy index.html content to App.js
v.	copy style.css content to index.css
vi.	replace class with className

6.	Share Code On Github
i.	Initialize git repository
ii.	Commit changes
iii.	Create github account
iv.	Create repo on github
v.	connect local repo to github repo
vi.	push changes to github

7.	Create Rating and Product Component
i.	create components/Rating.js
ii.	create div.rating
iii.	style div.rating, span and last span
iv.	Create Product component
v.	Use Rating component

8.	Build Product Screen
i.	Install react-router-dom
ii.	Use BrowserRouter and Route for Home Screen
iii.	Create HomeScreen.js
iv.	Add product list code there
v.	Create ProductScreen.js
vi.	Add new Route from product details to App.js
vii.	Create 3 columns for product image, info and action

9.	Create Node.JS Server
i.	run npm init in root folder
ii.	Update package.json set type: module
iii.	Add .js to imports
iv.	npm install express
v.	create server.js
vi.	add start command as node backend/server.js
vii.	require express
viii.	create route for / return backend is ready.
ix.	move products.js from frontend to backend
x.	create route for /api/products
xi.	return products
xii.	run npm start

10.	Load Products From Backend
i.	edit HomeScreen.js
ii.	define products, loading and error.
iii.	create useEffect
iv.	define async fetchData and call it
v.	install axios
vi.	get data from /api/products
vii.	show them in the list
viii.	create Loading Component
ix.	create Message Box Component
x.	use them in HomeScreen

11.	Install ESlint For Code Linting
i.	install VSCode eslint extension
ii.	npm install -D eslint
iii.	run ./node_modules/.bin/eslint --init
iv.	Create ./frontend/.env
v.	Add SKIP_PREFLIGHT_CHECK=true

12.	Add Redux to Home Screen
i.	npm install redux react-redux
ii.	Create store.js
iii.	initState= {products:[]}
iv.	reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload}
v.	export default createStore(reducer, initState)
vi.	Edit HomeScreen.js
vii.	shopName = useSelector(state=>state.products)
viii.	const dispatch = useDispatch()
ix.	useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data})
x.	Add store to index.js

13.	Add Redux to Product Screen
i.	create product details constants, actions and reducers
ii.	add reducer to store.js
iii.	use action in ProductScreen.js
iv.	add /api/product/:id to backend api

14.	Handle Add To Cart Button
i.	Handle Add To Cart in ProductScreen.js
ii.	create CartScreen.js

15.	Implement Add to Cart Action
i.	create addToCart constants, actions and reducers
ii.	add reducer to store.js
iii.	use action in CartScreen.js
iv.	render cartItems.length

16.	Build Cart Screen
i.	create 2 columns for cart items and cart action
ii.	cartItems.length === 0 ? cart is empty
iii.	show item image, name, qty and price
iv.	Proceed to Checkout button
v.	Implement remove from cart action

17.	Implement Remove From Cart Action
i.	create removeFromCart constants, actions and reducers
ii.	add reducer to store.js
iii.	use action in CartScreen.js

18.	Create Sample Users In MongoDB
i.	npm install mongoose
ii.	connect to mongodb
iii.	create config.js
iv.	npm install dotenv
v.	export MONGODB_URL
vi.	create models/userModel.js
vii.	create userSchema and userModel
viii.	create userRoute
ix.	Seed sample data

19.	Create Sample Products In MongoDB
i.	create models/productModel.js
ii.	create productSchema and productModel
iii.	create productRoute
iv.	Seed sample data

20.	Create Sign-in Backend
i.	create /signin api
ii.	check email and password
iii.	generate token
iv.	install json web token
v.	install dotenv
vi.	return token and data
vii.	test it using postman

21.	Design SignIn Screen
i.	create SigninScreen
ii.	render email and password fields
iii.	create signin constants, actions and reducers
iv.	Update Header based on user login
22.	Implement SignIn Action
i.	create signin constants, actions and reducers
ii.	add reducer to store.js
iii.	use action in SigninScreen.js
23.	Create Register Screen
i.	create API for /api/users/register
ii.	insert new user to database
iii.	return user info and token
iv.	create RegisterScreen
v.	Add fields
vi.	Style fields
vii.	Add screen to App.js
viii.	create register action and reducer
ix.	check validation and create user
24.	Create Shipping Screen
i.	create CheckoutSteps.js component
ii.	create shipping fields
iii.	implement shipping constant, actions and reducers
25.	Create Payment Screen
i.	create payment fields
ii.	implement shipping constant, actions and reducers
26.	Design Place Order Screen
i.	design order summary fields
ii.	design order action
27.	Create Place Order API
i.	createOrder api
ii.	create orderModel
iii.	create orderRouter
iv.	create post order route
28.	Implement PlaceOrder Action
i.	handle place order button click
ii.	create place order constants, action and reducer
29.	Create Order Screen
i.	build order api for /api/orders/:id
ii.	create OrderScreen.js
iii.	dispatch order details action in useEffect
iv.	load data with useSelector
v.	show data like place order screen
vi.	create order details constant, action and reducer
30.	Add PayPal Button
i.	get client id from paypal
ii.	set it in .env file
iii.	create route form /api/paypal/clientId
iv.	create getPaypalClientID in api.js
v.	add paypal checkout script in OrderScreen.js
vi.	show paypal button
31.	Implement Order Payment
i.	update order after payment
ii.	create payOrder in api.js
iii.	create route for /:id/pay in orderRouter.js
iv.	rerender after pay order
32.	Display Orders History
i.	create customer orders api
ii.	create api for getMyOrders
iii.	show orders in profile screen
iv.	style orders
33.	Display User Profile
i.	create user details api
ii.	show user information
34.	Update User Profile
i.	create user update api
ii.	update user info
35.	Create Admin View
i.	Create Admin Menu
ii.	Create Admin Middleware in Backend
iii.	Create Admin Route in Frontend
36.	List Products
i.	Create Product List Screen
ii.	Add reducer to store
iii.	show products on the screen
37.	Create Product
i.	build create product api
ii.	build Create Product button
iii.	define product create constant, action and reducer
iv.	use action in Product List Screen
38.	Build Product Edit Screen
i.	create edit screen
ii.	define state
iii.	create fields
iv.	load product details
v.	add to routes
39.	Update Product
i.	define update api
ii.	define product update constant, action and reducer
iii.	use action in Product Edit Screen
40.	Upload Product Image
i.	npm install multer
ii.	define upload router
iii.	create uploads folder
iv.	Handle frontend
41.	Delete Product
i.	create delete api in backend
ii.	create delete constants, action and reducer
iii.	use it in product list screen
42.	List Orders
i.	create order list api
ii.	create Order List Screen
iii.	Add reducer to store
iv.	show products on the screen
43.	Delete Order 2. create delete order action and reducer 3. add order delete action to order list
44.	Deliver Order
i.	create constant, actions and reducers for deliver order
ii.	add order deliver action to order details screen
45.	Publish To Heroku
i.	Create git repository
ii.	Create heroku account
iii.	install Heroku CLI
iv.	heroku login
v.	heroku apps:create amazona
vi.	Edit package.json for build script
vii.	Create Procfile
viii.	Create mongodb atlas database
ix.	Set database connection in heroku env variables
x.	Commit and push
46.	List Users
i.	build api for list users
ii.	Create UserList Screen
iii.	create order details constant, action and reducer
47.	Delete Users
i.	build api for delete users
ii.	create order details constant, action and reducer
iii.	Use action in UserListScreen
48.	Edit User
i.	build api for update users
ii.	create edit screen UI
49.	Implement Seller View
i.	add seller menu
ii.	create seller route
iii.	list products for seller
iv.	list orders for seller
v.	add Seller to Product List and Details Screen
50.	Create Seller Page
i.	create seller page
ii.	update product component and product screen
iii.	update product routes
51.	Add Top Seller Carousel
i.	install react carousel
ii.	implement actions and reducers for top sellers
iii.	use react carousel with data in Home Screen
52.	Force Order Items From One Seller
i.	update addToCart action to buy from one seller at an order
53.	Create Search Box and Search Screen
i.	create search bar in Header.js
ii.	add style
iii.	handle submit form
iv.	edit parse url to get query string
v.	update product list api for search by name
54.	Add Advanced Search Filter 1. filter by category 2. filter by price range 3. filter by average rating
55.	Complete Advanced Search 1. filter by price 2. filter by rating 3. sort by price, rating, ...
56.	Rate and Review Products 1. rate products 2. create actions and reducers
57.	Choose Address On Google Map 1. create google map credentials 2. update .env file with Google Api Key 3. create api to send google api to frontend 4. create map screen 5. fetch google api 6. getUserLocation 7. install @react-google-maps/api 8. use it in shipping screen 9. apply map to the checkout screen
58.	BugFix: Running Locally Without Issue
i.	add seller info to data.js
ii.	seed product data with admin info as seller
iii.	fix isSeller and isAdmin on update user
iv.	remove auth from user details
59.	Implement Pagination
i.	add pagination to product router in backend
ii.	apply page number to actions and reducers in frontend
iii.	show page numbers in search screen
