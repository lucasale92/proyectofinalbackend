import { CartModel } from '../DAO/models/carts.models.js';
import { ProductModel } from '../DAO/models/products.model.js';
import { CartClass } from '../DAO/classes/carts.class.js';

const cartClass = new CartClass();

export class CartService {
  async getAll() {
    try {
      const cart = await cartClass.getAll();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async createCart() {
    try {
      const cart = await cartClass.createCart();
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await cartClass.getCartById(cartId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      const cart = await cartClass.getCartById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      const existingProduct = cart.products.find((product) => product._id._id.toString() === productId.toString());
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ _id: productId, quantity: 1 });
      }
      const savedCart = await cart.save();
      return savedCart;
    } catch (error) {
      throw error;
    }
  }

  async updateCart(cid, products) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(cid, { products, quantity }, { new: true });
      return updatedCart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito en la base de datos');
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await cartClass.getCartById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const productIndex = cart.products.findIndex((product) => product._id.toString() === productId);
      if (productIndex === -1) {
        throw new Error('Producto no encontrado en el carrito');
      }

      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
      } else {
        cart.products.splice(productIndex, 1);
      }

      const savedCart = await cart.save();
      return savedCart;
    } catch (error) {
      throw error;
    }
  }

  async cleanCart(cid) {
    const cart = await cartClass.cleanCart(cid);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    cart.products = [];

    return await cart.save();
  }
}