import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'

const expect= chai.expect;
const requester = supertest("http://localhost:8080")

describe("Set de pruebas de integracion de products", function () {
    this.timeout(10000)
    this.productId = ""
    this.cookie = {}

    before ( async function () {

      await mongoose.connect("mongodb+srv://mberdun:corsa123@codercluster.gk2ir0t.mongodb.net/test?retryWrites=true&w=majority");
        
        const user = {
            email : "pelusa@correo",
            password : "123"
        }
        const result = await requester.post("/api/users/login").send(user)
  /*         console.log(result);
 */        const cookieResult = result.headers['set-cookie'][0]

        this.cookie = {
            name : cookieResult.split('=')[0],
            value : cookieResult.split('=')[1]
        }
  /*         console.log(this.cookie);
 */        //hasta aca me toma todo bien!
    })

    
    
    it('Endpoint /api/products (GET) returns an array of products', async function () {
        const { statusCode, ok, _body } = await requester
          .get('/api/products')
          .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

  /*         console.log(_body);
 */    
        expect(statusCode).to.be.ok.and.eq(200)
        expect(_body.payload).to.have.property('docs')
        expect(ok).to.be.ok
      })

    it("Endpoint /api/products (POST) should create a product succesfully", async function() {

      const productMock = {
        title: "Test Product",
        description: 'This is a product made from a test',
        price: 10,
        status: true,
        code: "1",
        stock: 35,
        category: "fashion",
      }

      const result = await requester
      .post('/api/products')
      .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
      .send(productMock)

      const { statusCode, ok, _body } = result;
      console.log(result);

      expect(statusCode).to.be.ok.and.eq(201)
      expect(_body.payload).to.have.property('_id')
      expect(ok).to.be.ok
    }) 
    
     it("Endpoint /api/products/:pid (GET) should return a product by its ID", async function () {
      const result = await requester.get(
        `/api/products/643c06c02e7c73eef17b0e9d`
      )
      console.log(result);

      const { statusCode, ok, _body } = result;

      expect(statusCode).to.be.ok.and.eq(200)
      expect(_body.payload._id).to.be.eq("643c06c02e7c73eef17b0e9d")
      expect(ok).to.be.ok
    }) 

     it( "Endpoint /api/products/:pid (PUT) should update an existing product by its ID", async function () {
      const mockUpdate = {
        title : "Product Update Test"
      }

      const result = await requester
      .put("/api/products/643c06c02e7c73eef17b0e9d")
      .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
      .send(mockUpdate);

      console.log(result);

      const {statusCode, _body, ok} = result

      expect(statusCode).to.be.ok.and.eq(200)
      expect(_body.payload).to.have.property('modifiedCount').eq(1)
      expect(ok).to.be.ok

    }) 

    it ("Endpoint /api/products/:pid (DELETE) should delete a product by its ID ", async function () {

      const result = await requester.delete("/api/products/643c06c02e7c73eef17b0e9d")
      .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

      console.log(result);

      const {statusCode, _body, ok} = result

      expect(statusCode).to.be.ok.and.eq(200)
      expect(_body.payload).to.have.property('deletedCount').eq(1)
      expect(ok).to.be.ok

      
    })
    



})