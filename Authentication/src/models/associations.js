import { User } from "./user/User.js";
import { Category } from "./category/Category.js";
import { Coffee } from "./product/Product.js";
import { Order } from "./order/Order.js";
import { OrderItem } from "./order/OrderItem.js";

// User associations
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Product associations
Coffee.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Coffee, { foreignKey: 'categoryId', as: 'products' });

Coffee.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Coffee, { foreignKey: 'productId', as: 'product' });

// Order associations
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

export default {
  User,
  Category,
  Coffee,
  Order,
  OrderItem
};
