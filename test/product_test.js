var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Product unit test",function(){
    it('should return success to create new product', function(done) {
        var product = {
            name: 'create new product',
            stock: 550,
            price: 550,
            id:'56c16eec2f76773c1eaee8d4'
        };
        server
            .post('/products')
            .send(product)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.status.should.equal(200);
                done();
            });
    });
    //should return list of products
    it("should return products", function (done) {
        server
            .get("/products")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });

    //should return 404
    it("should return 404",function(done){
        server
            .get("/random")
            .expect(404)
            .end(function(err,res){
                res.status.should.equal(404);
                done();
            });
    })

    it('should correctly update an existing products', function(done){
        var product = {
            name: 'name_update',
            price: 100,
            stock:400
        };
        server
            .put('/products/56c0adc1469c6d440ad5882f')
            .expect('Content-Type', /json/)
            .send(product)
            .expect(200) //Status code
            .end(function(err,res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property('_id');
                res.body.name.should.equal('name_update');
                res.body.price.should.equal(100);
                res.body.stock.should.equal(400);
                done();
            });
    });

    it('should show an product', function(done){
        server
            .get('/products/56c0adc1469c6d440ad5882f')
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err,res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property('_id');
                res.body.name.should.equal('name_update');
                res.body.price.should.equal(100);
                res.body.stock.should.equal(400);
                done();
            });
    });

    it('should correctly delete an existing product', function(done){
        server
            .delete('/products/56c0aa26e16663281ecd3852')
            .expect(200) //Status code
            .end(function (err, res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });
});

