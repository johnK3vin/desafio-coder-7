import { Router } from "express";
import { productManager } from "../dao/models/productsManager.js";
import { CartManager } from "../dao/models/cartManager.js";

const viewRouter = Router()

viewRouter.get('/carts/:cid', async (req, res) => {
    const {cid} = req.params;
  try {
      const cart = await CartManager.findById(cid);
      console.log(cart)
      if (cart) {
          res.render('carts', { products: cart.products });
      } else {
          res.status(404).send({ respuesta: 'Error', mensaje: 'Carrito no encontrado' });
      }

  } catch (error) {
      res.status(400).send({ respuesta: 'Error', mensaje: error.message });
  }
});

viewRouter.get('/chat', (req, res) =>{
    res.render('chat', {
        title : "chat message",
        css : 'style.css',
        js : 'message.js'
    })
})

let listProd = [];

const cargarProd = async () => {
  try {
    listProd = await productManager.find();
  } catch (error) {
    console.error("Error: al llamar productos");
  }
};
cargarProd();

viewRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {
      title: "Agregar Producto",
      css: "realTimeStyle.css",
      js: "realTimeProducts.js",
      product: listProd
    });
  });

viewRouter.get("/home", (req, res) => {
    res.render("home", {
      title: "home - productos",
      css: "homeStyle.css",
      js: "home.js",
    });
});

viewRouter.get('/signup', (req, res) => {
  res.render('signup', {
      js: "signup.js",
      css: "signup.css",
      title: "signup",
  });
});

viewRouter.get('/login', (req, res) => {
  res.render('login', {
      js: "login.js",
      css: "login.css",
      title: "login",
      
  });
})

export default viewRouter;