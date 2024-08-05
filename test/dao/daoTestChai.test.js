import { UsuariosManagerMongo } from "../../src/dao/managersMongo/usuariosManager.js";
import productManagerMongo from "../../src/dao/managersMongo/productManagerMongo.js";
import mongoose from "mongoose";
import { expect, should } from "chai";
import { config } from "../../src/config/config.js";
import { before, describe, it } from "mocha";

try {
  await mongoose.connect(
    `mongodb+srv://villafaneigna:CoderCoder@cluster0.oketjqj.mongodb.net/?retryWrites=true&w=majority&dbName=${config.DB_NAME}`
  );
} catch (error) {
  console.log(error.message);
  process.exit();
}

const assert = Assert.strict;

describe("Test UsuariosManagerMongo", function () {
  this.timeout(8000);

  before(function () {
    this.userDAO = new UsuariosManagerMongo();
  });

  it("Verificar json de usuario", async function () {
    let resultado = await this.userDAO.getBy();
    assert.equal(typeof resultado, "object");
  });
});

describe("Test productos", function () {
  this.timeout(8000);

  before(function () {
    this.productDAO = new productManagerMongo();
  });

  it("GET productos", async function () {
    let resultado = await this.productDAO.getProduct(3);

    assert.equal(Array.isArray(resultado), true);
  });
});

describe("Obtener producto segun ID", function () {
  this.timeout(8000);

  before(function () {
    this.productDAO = new productManagerMongo();
  });

  it("GET producto por ID", async function () {
    let resultado = await this.productDAO.getProductById(
      "660b762affee5bf08a8bf206"
    );

    assert.equal(typeof resultado, "object");
    assert.equal(typeof resultado.code, "number");
  });
});

describe("Test ProductosManagerMongo", function () {
  this.timeout(8000);

  before(function () {
    this.productDAO = new productManagerMongo();
  });

  it("Actualizar producto", async function () {
    // Datos de prueba
    const productId = "660b762affee5bf08a8bf206";
    const updatedFields = { title: "Sal Dos Anclas", price: 1650 };

    // Actualizar el producto
    let resultado = await this.productDAO.updateProduct(
      productId,
      updatedFields
    );

    // Verificar los cambios
    assert.equal(resultado.title, "Sal Dos Anclas");
    assert.equal(resultado.price, 1650);
  });
});
