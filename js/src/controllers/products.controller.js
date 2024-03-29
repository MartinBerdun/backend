import { productService } from "../servicies/index.js";

import CustomError from "../errors/CustomError.js";
import {
  ProductMessage,
  ErrorsName,
  ErrorsCause,
  ParamsMesage,
} from "../errors/error.enum.js";

import jwt from "jsonwebtoken"

import { createFakerProducts } from "../mocks/products.mock.js";

export const getProducts = async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      category = null,
      status = null,
      sort = null,
    } = req.query;
    
    
    if (isNaN(limit)) {
      return res.status(400).send({
        status: "error",
        error: `Limit ${limit} is not valid`,
      });
    }
    
    if (isNaN(page)) {
      return res.status(400).send({
        status: "error",
        error: `Page ${page} is not a valid value`,
      });
    }
    const products = await productService.getProducts(
    limit,
    page,
    category,
    status,
    sort
    );
    
    if (!products)
      return res.status(404).send({
        status: "error",
        error: `No products found`,
      });

     return res.status(200).send({ status: "ok", payload: products });

  } catch (error) {

    console.log(`Failed to get products at controller ${error}`);
    /* req.logger.error(`Failed to get products at controller ${error}`); */

    return res
      .status(404)
      .send({ status: "error", error: "Products not created or found" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description ,
      price ,
      code,
      stock,
      category
    } = req.body;

    if (!title ||
      !description ||
      !price ||
      !code ||
      !stock ||
      !category
      ) {
        console.log("Invalid product");
      }

       const { jwtCookie:token } = req.cookies;

      console.log(token);
      
       if (!token) {
        return res.status(400).send({
          status: 'error',
          error: 'Failed to get token'
        })
      }   

    const addProduct = await productService.addProduct(title,
      description ,
      price ,
      code,
      stock,
      category);
    
    return res
      .status(201)
      .send({status: "Success",payload: addProduct});

  } catch (error) {
    return res
      .status(404)
      .send({ status: "error", error: `Product not added ${error}` });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
/*     req.logger.debug(`Id : ${pid}`);
 */
    if (!pid) {
     /*  throw new CustomError({
        name : ErrorsName.ERROR_NAME,
        message: ProductMessage.PRODUCT_MESSAGE_FOUND,
        cause : ErrorsCause.MAIN_ErrERROR_CAUSE,
      }); */
      return res.status(404).send({ status: "error", error: "pid not valid" });
    }

    const product = await productService.getProductById(pid);

   /*  if (!product) {
      throw new CustomError({
        name : "erroroorr",
        message: "message error",
        cause : "error cause error",
      });
    } */
   /*  console.log(product);
    req.logger.debug(`El producto es ${product}`) */

    return res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
/*     req.logger.error(error);
 */    
    /* throw new CustomError({
      name : "erroroorr",
      message: "message error",
      cause : "error cause error",
    }); */
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;

    if (!pid || !product) {
      return res.status(404).send({ status: "error", error: "invalid values" });
    }

    console.log({ pid });

    const updatedProduct = await productService.updateProduct(pid, product);

    if (!updatedProduct) {
      return res
        .status(404)
        .send({ status: "error", error: "Product not updated" });
    }

    return res.status(200).send({ status: "success", payload: updatedProduct });
  } catch (error) {
    console.log(`Failed to update product ${error}`);
    return res
      .status(404)
      .send({ status: "error", error: "Product not updated" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    if (!pid) {
      return res.status(404).send({ status: "error", error: "invalid values" });
    }

    const { jwtCookie: token } = req.cookies

    if (!token) {
      return res.status(400).send({
        status: 'error',
        error: 'Failed to get token'
      })
    }

    const deletedProduct = await productService.deleteProduct(pid, token);

    if (!deletedProduct) {
      return res
        .status(404)
        .send({ status: "error", error: "product not deleted" });
    }

    return res.status(200).send({ status: "success", payload: deletedProduct });
    
  } catch (error) {
    console.log(`Failed to found product by Id ${error}`);
    return res
      .status(404)
      .send({ status: "error", error: "Product not updated" });
  }
};

export const deleteManyProducts = async (req, res) => {
  try {
    
    const product = await productService.deleteManyProducts()

    return res.status(200).send({ status: "success", payload: product });

  } catch (error) {
    console.log(error);
  }
}

export function mockingProducts(req, res) {
  try {
    let products = [];
    for (let i = 0; i < 100; i++) {
      products.push(createFakerProducts());
    }

    return res.status(200).send({ status: "Success", payload: products });
  } catch (error) {
    return res.status(500).send({ status: "Error", error: error });
  }
}
