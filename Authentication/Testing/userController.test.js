import { userController } from "../src/controller/user/userController.js";
import { User } from "../src/models/index.js";

jest.mock("../src/models/index.js", () => ({
  User: {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

describe("userController", () => {
  let req;
  let res;
  let statusMock;
  let sendMock;
  let jsonMock;

  beforeEach(() => {
    sendMock = jest.fn();
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ send: sendMock, json: jsonMock }));
    res = {
      status: statusMock,
      send: sendMock,
      json: jsonMock,
    };
    req = {
      body: {},
      params: {},
      user: {},
    };
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return all users with status 200", async () => {
      const users = [{ id: 1, name: "John" }];
      User.findAll.mockResolvedValue(users);

      await userController.getAll(req, res);

      expect(User.findAll).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({ data: users, message: "successfully fetched data" });
    });

    it("should return status 500 on error", async () => {
      User.findAll.mockRejectedValue(new Error("DB error"));

      await userController.getAll(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Failed to fetch users" });
    });
  });

  describe("create", () => {
    it("should create a user and return 201", async () => {
      req.body = { name: "John", email: "john@example.com", password: "pass123" };
      const createdUser = { id: 1, ...req.body };
      User.create.mockResolvedValue(createdUser);

      await userController.create(req, res);

      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(sendMock).toHaveBeenCalledWith({ data: createdUser, message: "successfully created user" });
    });

    it("should return 500 for invalid payload", async () => {
      req.body = { name: "John" }; // missing email and password

      await userController.create(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith({ message: "Invalid paylod" });
      expect(User.create).not.toHaveBeenCalled();
    });

    it("should return 500 on error", async () => {
      req.body = { name: "John", email: "john@example.com", password: "pass123" };
      User.create.mockRejectedValue(new Error("DB error"));

      await userController.create(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Failed to fetch users" });
    });
  });

  describe("getById", () => {
    it("should return user by id with status 200", async () => {
      req.user = { id: 1 };
      const user = { id: 1, name: "John" };
      User.findOne.mockResolvedValue(user);

      await userController.getById(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({ message: "user fetched successfully", data: user });
    });

    it("should return 500 if user not found", async () => {
      req.user = { id: 1 };
      User.findOne.mockResolvedValue(null);

      await userController.getById(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 on error", async () => {
      req.user = { id: 1 };
      User.findOne.mockRejectedValue(new Error("DB error"));

      await userController.getById(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Failed to fetch users" });
    });
  });

  describe("update", () => {
    it("should update user and return 201", async () => {
      req.params = { id: 1 };
      req.body = { name: "John Updated", email: "johnupdated@example.com", password: "newpass" };
      const oldUser = {
        id: 1,
        name: "John",
        email: "john@example.com",
        password: "pass123",
        save: jest.fn(),
      };
      User.findOne.mockResolvedValue(oldUser);

      await userController.update(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(oldUser.name).toBe(req.body.name);
      expect(oldUser.email).toBe(req.body.email);
      expect(oldUser.password).toBe(req.body.password);
      expect(oldUser.save).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(sendMock).toHaveBeenCalledWith({ data: oldUser, message: "user updated successfully" });
    });

    it("should return 500 if user not found", async () => {
      req.params = { id: 1 };
      User.findOne.mockResolvedValue(null);

      await userController.update(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 on error", async () => {
      req.params = { id: 1 };
      User.findOne.mockRejectedValue(new Error("DB error"));

      await userController.update(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Failed to update users" });
    });
  });

  describe("delelteById", () => {
    it("should delete user and return 201", async () => {
      req.params = { id: 1 };
      const oldUser = {
        id: 1,
        destroy: jest.fn(),
      };
      User.findOne.mockResolvedValue(oldUser);

      await userController.delelteById(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(oldUser.destroy).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(sendMock).toHaveBeenCalledWith({ message: "user deleted successfully" });
    });

    it("should return 500 if user not found", async () => {
      req.params = { id: 1 };
      User.findOne.mockResolvedValue(null);

      await userController.delelteById(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 on error", async () => {
      req.params = { id: 1 };
      User.findOne.mockRejectedValue(new Error("DB error"));

      await userController.delelteById(req, res);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Failed to fetch users" });
    });
  });
});
