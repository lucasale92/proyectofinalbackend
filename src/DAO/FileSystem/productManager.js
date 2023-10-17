import fs from 'fs';

class ProductManager {
  id = 1;
  constructor(path) {
    this.path = path;
  }

  async addProduct(productData) {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }

      const { title, description, price, thumbnail, code, stock, category } = productData;

      if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
        return 'Completar todos los campos';
      } else {
        let products = [];

        let productsContent = await fs.promises.readFile(this.path, 'utf-8');
        products = JSON.parse(productsContent);

        const productFound = products.some((item) => item.code == code);
        if (productFound) {
          return 'El producto ya existe';
        } else {
          if (products.length > 0) {
            this.id = products[products.length - 1].id + 1;
          }
          const product = { id: this.id, ...productData, status: true };
          products.push(product);
          let productString = JSON.stringify(products, null, 2);
          await fs.promises.writeFile(this.path, productString);
          return 'Producto agregado!';
        }
      }
    } catch (error) {
    }
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }
      let products = [];

      let productsContent = await fs.promises.readFile(this.path, 'utf-8');
      products = JSON.parse(productsContent);
      return products;
    } catch (error) {
    }
  }

  async getProductById(id) {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }
      let products = [];
      let productsContent = await fs.promises.readFile(this.path, 'utf-8');
      products = JSON.parse(productsContent);

      const productFound = products.find((item) => item.id == id);
      if (productFound) {
        return productFound;
      } else {
        return null;
      }
    } catch (error) {
    }
  }

  async updateProduct(id, modifyProduct) {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }
      let products = [];
      let productsContent = await fs.promises.readFile(this.path, 'utf-8');
      products = JSON.parse(productsContent);

      const { title, description, price, thumbnail, stock } = modifyProduct;
      let indexProduct = products.findIndex((index) => index.id === id);
      if (indexProduct !== -1) {
        products[indexProduct].title = title || products[indexProduct].title;
        products[indexProduct].description = description || products[indexProduct].description;
        products[indexProduct].price = price || products[indexProduct].price;
        products[indexProduct].thumbnail = thumbnail || products[indexProduct].thumbnail;
        products[indexProduct].stock = stock || products[indexProduct].stock;

        let productString = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, productString);
        return 'Producto modificado';
      } else {
        return 'Producto no encontrado';
      }
    } catch (error) {
    }
  }

  async deleteProduct(id) {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]');
      }
      let products = [];
      let productsContent = await fs.promises.readFile(this.path, 'utf-8');
      products = JSON.parse(productsContent);

      let indexProduct = products.findIndex((index) => index.id === id);
      if (indexProduct !== -1) {
        products.splice(indexProduct, 1);
        let productString = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, productString);
        return 'Producto borrado!';
      } else {
        return 'Producto no encontrado';
      }
    } catch (error) {
    }
  }
}

export default ProductManager;