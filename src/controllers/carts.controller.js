import { CartService } from '../services/carts.service.js';
import { Logger } from '../utils/logger.utils.js';  

const Carts = new CartService();

class CartController {
  async creatCart(req, res) {
    try {
      const cart = await Carts.createCart();
      res.status(201).json({
        status: 'success',
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error al crear carrito',
      });
    }
  }

  async addProductToCart(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const cart = await Carts.addProductToCart(cid, pid);
      res.status(200).json({
        status: 'success',
        payload: cart,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        status: 'error',
        message: 'FATAL ERROR',
      });
    }
  }

  async getCartById(req, res) {
    try {
      const cid = req.params.cid;
      const cart = await Carts.getCartById(cid);
      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: `Carrito ${cid} no encontrado`,
        });
      }
      res.status(200).json({
        status: 'success',
        msg: 'Carrito encontrado',
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error al obtener el carrito',
      });
    }
  }

  async getCarts(req, res) {
    try {
      const carts = await Carts.getAll();
      return res.status(201).json({
        status: 'success',
        msg: 'Lista de carritos',
        payload: carts,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Carrito no encontrado',
        payload: {},
      });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products, quantity } = req.body;
      const updatedCart = await Carts.updateCart(cid, products, quantity);
      return res.status(200).json({ status: 'success', payload: updatedCart });
    } catch (error) {
      logger.error(error);
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const cart = await Carts.removeProductFromCart(cid, pid);
      return res.status(200).json({
        status: 'success',
        msg: 'Producto eliminado del carrito',
        payload: cart,
      });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }

  async cleanCart(req, res) {
    try {
      const cid = req.params.cid;
      const cart = await Carts.cleanCart(cid);
      return res.status(200).json({
        status: 'success',
        msg: 'Producto eliminado del carrito',
        payload: cart,
      });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }
}

export const cartController = new CartController();