import { jest } from '@jest/globals';
import { productController } from '../src/controller/product/productController.js';

jest.mock('../src/models/product/Product.js', () => {
  return {
    Coffee: {
      findAll: jest.fn(),
    },
  };
});

import { Coffee } from '../src/models/product/Product.js';

// Helper to mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('productController', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (console.error.mockRestore) {
      console.error.mockRestore();
    }
  });

  describe('getAllProducts', () => {
    it('should return 200 and all products', async () => {
      const mockProducts = [
        {
          toJSON: () => ({ id: 1, name: 'Product1', image: null }),
        },
        {
          toJSON: () => ({ id: 2, name: 'Product2', image: null }),
        },
      ];
      Coffee.findAll.mockResolvedValue(mockProducts);

      const req = {};
      const res = mockRes();

      await productController.getAllProducts(req, res);

      expect(Coffee.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [
          { id: 1, name: 'Product1', image: null },
          { id: 2, name: 'Product2', image: null },
        ],
        message: "Products fetched successfully",
      });
    });

    it('should return 500 if database fails', async () => {
      Coffee.findAll.mockRejectedValue(new Error('DB Error'));

      const req = {};
      const res = mockRes();

      await productController.getAllProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch products: DB Error',
      });
    });
  });

  // Additional tests for addProduct, getProductByCategory, getProductById, deleteProduct, updateProduct can be added similarly
});
