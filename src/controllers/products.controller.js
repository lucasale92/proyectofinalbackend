import { ProductService } from '../services/products.service.js';
import { logger } from '../utils/logger.utils.js';

const Products = new ProductService();

class ProductsController {
  async getAll(req, res) {
    try {
      const { limit, page, sort } = req.query;
      const category = req.query.category || '';
      const products = await Products.getProducts(limit, page, category, sort);

      return res.status(200).json({
        status: 'success',
        msg: 'listado de productos',
        payload: products,
      });
    } catch (e) {
      logger.error(error);
      return res.status(500).json({
        status: 'error',
        msg: 'algo salió mal',
        products: {},
      });
    }
  }

  async getbyId(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.getOneById(id);
      return res.status(200).json({
        status: 'success',
        msg: 'listado de productos',
        payload: product,
      });
    } catch (e) {
      logger.error(error);
      return res.status(500).json({
        status: 'error',
        msg: 'algo salió mal',
        payload: {},
      });
    }
  }

  async createOne(req, res) {
    try {
      const { title, description, price, thumbnail, code, stock, category, status } = req.body;

      const productCreated = await Products.createOne(title, description, price, thumbnail, code, stock, category, status);
      return res.status(201).json({
        status: 'success',
        msg: 'Producto creado',
        payload: productCreated,
      });
    } catch (e) {
      logger.error(error);
      return res.status(500).json({
        status: 'error',
        msg: 'algo salió mal',
        payload: {},
      });
    }
  }

  async updateOne(req, res) {
    try {
      const { id } = req.params;
      const { title, description, price, thumbnail, code, stock, category, status } = req.body;

      const productUptaded = await Products.updateOne(id, title, description, price, thumbnail, code, stock, category, status);

      return res.status(201).json({
        status: 'success',
        msg: 'Producto actualizado',
        payload: productUptaded,
      });
    } catch (e) {
      logger.error(error);
      return res.status(500).json({
        status: 'error',
        msg: 'algo salió mal',
        payload: {},
      });
    }
  }

  async deletOne(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Products.deleteOne(id);
      return res.status(200).json({
        status: 'success',
        msg: 'Producto borrado',
        payload: deleted,
      });
    } catch (e) {
      logger.error(error);
      return res.status(500).json({
        status: 'error',
        msg: 'algo salió mal',
        payload: {},
      });
    }
  }
}

export const productsController = new ProductsController();