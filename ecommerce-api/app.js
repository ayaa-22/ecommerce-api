// Express
import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db.js";
import productsRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const server = express();
dotenv.config();
connectToDB();

server.use(express.json());
server.use("/products", productsRoutes);
server.use("/user", userRoutes);
server.use("/wishlist", wishlistRoutes);
server.use("/cart", cartRoutes);

// Lab
// api==>remove from wishlist  ===> DELETE /wishlist/:productId
server.listen(4000, () => {
  console.log("Server is Running...");
});
