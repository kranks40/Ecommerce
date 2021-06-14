import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Oketo",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: "Puma",
        logo: "/images/logo1.png",
        description: "best seller",
        rating: 4.5,
        numReviews: 12,
      },
    },
    {
      name: "mellia",
      email: "user@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptopsk",
      category: "men's clothing",
      image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      // image: "/images/Fjallraven.jpg",
      price: 109.96,
      countInStock: 5,
      brand: "Fjallraven",
      rating: 4.5,
      numReviews: 10,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    },
    {
      name: "Mens Casual Premium Slim Fit T-Shirts",
      category: "men's clothing",
      image: "/images/Men_T_Shirt.jpg",
      price: 22.3,
      countInStock: 5,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    },
    {
      name: "Mens Cotton Jacket",
      category: "men's clothing",
      image: "/images/mens_cotton_jacket.jpg",
      price: 55.99,
      countInStock: 5,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description:
        "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    },
    {
      name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      category: "jewelery",
      image: "/images/John_Hardy.jpg",
      price: 695.0,
      countInStock: 5,
      brand: "John Hardy",
      rating: 4.5,
      numReviews: 10,
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    },
    {
      name: "Solid Gold Petite Micropave",
      category: "jewelery",
      image: "/images/Solid_Gold.jpg",
      price: 9.99,
      countInStock: 5,
      brand: "Petite Micropave",
      rating: 4.5,
      numReviews: 10,
      description:
        "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    },
    {
      name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      category: "electronics",
      image: "/images/WD.jpg",
      price: 114.0,
      countInStock: 5,
      brand: "WD",
      rating: 4.5,
      numReviews: 10,
      description:
        "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty.",
    },
    {
      name: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      category: "electronics",
      image: "/images/Acer.jpg",
      price: 559.0,
      countInStock: 5,
      brand: "Acer",
      rating: 4.5,
      numReviews: 10,
      description:
        "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz.",
    },
    {
      name: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
      category: "electronics",
      image: "/images/Samsung.jpg",
      price: 999.99,
      countInStock: 5,
      brand: "Samsung",
      rating: 4.5,
      numReviews: 10,
      description:
        "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag.",
    },
    {
      name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      category: "Women's clothing",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      price: 29.95,
      countInStock: 5,
      brand: "Samsung",
      rating: 4.5,
      numReviews: 10,
      description:
        "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag.",
    },
  ],
};

export default data;
