import jwt from "jsonwebtoken";
import mg from "mailgun-js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      //signin has three parameters, user object, json webtoken secrets,
      //jwt secrets is like a key to ecrypt your data and generate a token
      // it's a secure data so don't keep it here to be seen. you need to
      //put it in a .env file and .env package
      //the last parameter is options
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "3d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    //the slice function gets rid of the first 6 parts of the token and takes from the 7th digit
    const token = authorization.slice(7, authorization.length);
    //jwt is used to decrypt the token using verify then the second parameter is the JWT secrect.If token doesn't exist then use "somethingsecret"
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (error, decode) => {
        if (error) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

export const isAdmin = (req, res, next) => {
  //To protect admin route in backend you add a middleware isAdmin.
  //Check if req.user and req.user.isadmin is true then pass to the next middleware otherwise render error message
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

export const isSeller = (req, res, next) => {
  //To protect seller route in backend you add a middleware isSeller.
  //Check if req.user and req.user.isSeller is true then pass to the next middleware otherwise render error message
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
};

export const isSellerOrAdmin = (req, res, next) => {
  //we creating a middleware to authenticate users that a sellers or admin
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>Thanks for shopping with us</h1>
  <p>
    Hi ${order.user.name},</p>
    <p>We have finished processing your order.</p>
    <h2>[Order ${order._id}] (${order.createdAt
    .toString()
    .substring(0, 10)})</h2>
    <table>
    <thead>
    <tr>
    <td><strong>Product</strong></td>
    <td><strong>Quantity</strong></td>
    <td><strong align="right">Price</strong></td>
    </thead>
    <tbody>
    ${order.orderItems
      .map(
        (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.qty}</td>
    <td align="right">$${item.price.toFixed(2)}</td>
    </tr>
    `
      )
      .join("\n")}
    </tbody>
    <tfoot>
    <tr>
    <td colspan="2">Items Price:</td>
    <td align="right">$${order.itemsPrice.toFixed(2)}</td>
    </tr>

    <tr>
    <td colspan="2">Tax Price:</td>
    <td align="right">$${order.taxPrice.toFixed(2)}</td>
    </tr>

    <tr>
    <td colspan="2">Shipping Price:</td>
    <td align="right">$${order.shippingPrice.toFixed(2)}</td>
    </tr>

    <tr>
    <td colspan="2"><strong>Total Price:</strong></td>
    <td align="right"><strong>$${order.totalPrice.toFixed(2)}</strong></td>
    </tr>

    <tr>
    <td colspan="2">Payment Method:</td>
    <td align="right">${order.paymentMethod}</td>
    </tr>
    </table>
    <h2>Shipping Address</h2>
    <p>
    ${order.ShippingAddress.fullName},</br>
    ${order.ShippingAddress.address},</br>
    ${order.ShippingAddress.city},</br>
    ${order.ShippingAddress.postalCode},</br>
    ${order.ShippingAddress.country},</br>
    </p>
    </hr>
    <p>Thanks for shopping wih SureBuy.</p>
    `;
};
