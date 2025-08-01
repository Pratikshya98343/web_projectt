import { orderController } from "../src/controller/order/orderController.js";
import { Order, OrderItem, Coffee, User } from "../src/models/index.js";
import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } from "../src/utils/emailService.js";

jest.mock("../src/models/index.js", () => ({
  Order: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  },
  OrderItem: {
    create: jest.fn(),
  },
  Coffee: {
    findByPk: jest.fn(),
  },
  User: {
    findByPk: jest.fn(),
  },
}));

jest.mock("../src/utils/emailService.js", () => ({
  sendOrderConfirmationEmail: jest.fn(),
  sendOrderStatusUpdateEmail: jest.fn(),
}));

describe("orderController", () => {
  let req;
  let res;
  let statusMock;
  let jsonMock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    res = {
      status: statusMock,
      json: jsonMock,
    };
    req = {
      body: {},
      params: {},
      user: {},
    };
    jest.clearAllMocks();
  });

  describe("createOrder", () => {
    it("should create order successfully", async () => {
      req.body = {
        items: [{ productId: 1, quantity: 2 }],
        shippingAddress: "123 Street",
        paymentMethod: "card",
      };
      req.user = { id: 1 };
      Coffee.findByPk.mockResolvedValue({ price: 10 });
      Order.create.mockResolvedValue({ id: 1 });
      OrderItem.create.mockResolvedValue({});
      Order.findByPk.mockResolvedValue({
        id: 1,
        items: [],
      });
      User.findByPk.mockResolvedValue({ email: "test@example.com" });
      sendOrderConfirmationEmail.mockResolvedValue();

      await orderController.createOrder(req, res);

      expect(Coffee.findByPk).toHaveBeenCalledWith(1);
      expect(Order.create).toHaveBeenCalled();
      expect(OrderItem.create).toHaveBeenCalled();
      expect(sendOrderConfirmationEmail).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        message: "Order created successfully",
      }));
    });

    it("should return 400 if items array is invalid", async () => {
      req.body = { items: [] };
      req.user = { id: 1 };

      await orderController.createOrder(req, res);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Order must include at least one item" });
    });

    it("should return 400 if item is invalid", async () => {
      req.body = { items: [{ productId: null, quantity: 0 }] };
      req.user = { id: 1 };

      await orderController.createOrder(req, res);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Each item must have a valid productId and quantity" });
    });

    it("should return 404 if product not found", async () => {
      req.body = { items: [{ productId: 1, quantity: 1 }] };
      req.user = { id: 1 };
      Coffee.findByPk.mockResolvedValue(null);

      await orderController.createOrder(req, res);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Product with ID 1 not found" });
    });

    it("should return 500 on error", async () => {
      req.body = { items: [{ productId: 1, quantity: 1 }] };
      req.user = { id: 1 };
      Coffee.findByPk.mockRejectedValue(new Error("DB error"));

      await orderController.createOrder(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.stringContaining("Failed to create order"),
      }));
    });
  });

  describe("getUserOrders", () => {
    it("should return orders for user", async () => {
      req.user = { id: 1 };
      Order.findAll.mockResolvedValue([{ id: 1 }]);

      await orderController.getUserOrders(req, res);

      expect(Order.findAll).toHaveBeenCalledWith(expect.objectContaining({
        where: { userId: 1 },
      }));
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        message: "Orders fetched successfully",
      }));
    });

    it("should return 404 if no orders found", async () => {
      req.user = { id: 1 };
      Order.findAll.mockResolvedValue([]);

      await orderController.getUserOrders(req, res);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "No orders found" });
    });

    it("should return 500 on error", async () => {
      req.user = { id: 1 };
      Order.findAll.mockRejectedValue(new Error("DB error"));

      await orderController.getUserOrders(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.stringContaining("Failed to fetch orders"),
      }));
    });
  });

  describe("getOrderById", () => {
    it("should return order if found", async () => {
      req.params = { id: 1 };
      req.user = { id: 1, role: "user" };
      Order.findOne.mockResolvedValue({ id: 1 });

      await orderController.getOrderById(req, res);

      expect(Order.findOne).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: 1, userId: 1 },
      }));
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        message: "Order fetched successfully",
      }));
    });

    it("should return 404 if order not found", async () => {
      req.params = { id: 1 };
      req.user = { id: 1, role: "user" };
      Order.findOne.mockResolvedValue(null);

      await orderController.getOrderById(req, res);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Order not found" });
    });

    it("should return 500 on error", async () => {
      req.params = { id: 1 };
      req.user = { id: 1, role: "user" };
      Order.findOne.mockRejectedValue(new Error("DB error"));

      await orderController.getOrderById(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.stringContaining("Failed to fetch order"),
      }));
    });
  });

  describe("getAllOrders", () => {
    it("should return all orders for admin", async () => {
      req.user = { role: "admin" };
      Order.findAll.mockResolvedValue([{ id: 1 }]);

      await orderController.getAllOrders(req, res);

      expect(Order.findAll).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        message: "All orders fetched successfully",
      }));
    });

    it("should return 403 for non-admin", async () => {
      req.user = { role: "user" };

      await orderController.getAllOrders(req, res);

      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Access denied. Admin role required." });
    });

    it("should return 404 if no orders found", async () => {
      req.user = { role: "admin" };
      Order.findAll.mockResolvedValue([]);

      await orderController.getAllOrders(req, res);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "No orders found" });
    });

    it("should return 500 on error", async () => {
      req.user = { role: "admin" };
      Order.findAll.mockRejectedValue(new Error("DB error"));

      await orderController.getAllOrders(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.stringContaining("Failed to fetch orders"),
      }));
    });
  });

  describe("updateOrderStatus", () => {
    it("should update order status for admin", async () => {
      req.user = { role: "admin" };
      req.params = { id: 1 };
      req.body = { status: "shipped" };
      const order = {
        id: 1,
        status: "pending",
        save: jest.fn(),
      };
      // Mock first call to findByPk returns order
      Order.findByPk.mockResolvedValueOnce(order);
      // Mock second call to findByPk returns updated order with user and email
      Order.findByPk.mockResolvedValueOnce({
        id: 1,
        status: "shipped",
        user: { email: "test@example.com" },
        items: [],
      });
      User.findByPk.mockResolvedValue({ email: "test@example.com" });
      sendOrderStatusUpdateEmail.mockResolvedValue();

      await orderController.updateOrderStatus(req, res);

      expect(order.save).toHaveBeenCalled();
      expect(sendOrderStatusUpdateEmail).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        message: "Order status updated successfully",
      }));
    });

    it("should return 400 for invalid status", async () => {
      req.user = { role: "admin" };
      req.params = { id: 1 };
      req.body = { status: "invalid" };

      await orderController.updateOrderStatus(req, res);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Invalid status value" });
    });

    it("should return 404 if order not found", async () => {
      req.user = { role: "admin" };
      req.params = { id: 1 };
      req.body = { status: "shipped" };
      Order.findByPk.mockResolvedValue(null);

      await orderController.updateOrderStatus(req, res);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Order not found" });
    });

    it("should return 403 for non-admin", async () => {
      req.user = { role: "user" };
      req.params = { id: 1 };
      req.body = { status: "shipped" };

      await orderController.updateOrderStatus(req, res);

      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Access denied. Admin role required." });
    });

    it("should return 500 on error", async () => {
      req.user = { role: "admin" };
      req.params = { id: 1 };
      req.body = { status: "shipped" };
      Order.findByPk.mockRejectedValue(new Error("DB error"));

      await orderController.updateOrderStatus(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.stringContaining("Failed to update order status"),
      }));
    });
  });

  describe("deleteOrder", () => {
    it("should delete order for admin", async () => {
      req.user = { role: "admin" };
      req.params = { id: 1 };
      const order = {
        id: 1,
        destroy: jest.fn(),
      };
      Order.findByPk.mockResolvedValue(order);

      await orderController.deleteOrder(req, res);

      expect(order.destroy).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Order deleted successfully" });
    });

    it("should return 404 if order not found", async () => {
      req.user = { role: "admin" };
      req.params = { id: 1 };
      Order.findByPk.mockResolvedValue(null);

      await orderController.deleteOrder(req, res);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Order not found" });
    });

    it("should return 403 for non-admin", async () => {
      req.user = { role: "user" };
      req.params = { id: 1 };

      await orderController.deleteOrder(req, res);

      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Access denied. Admin role required." });
    });

    it("should return 500 on error", async () => {
      req.user = { role: "admin" };
      req.params = { id: 1 };
      Order.findByPk.mockRejectedValue(new Error("DB error"));

      await orderController.deleteOrder(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.stringContaining("Failed to delete order"),
      }));
    });
  });
});
