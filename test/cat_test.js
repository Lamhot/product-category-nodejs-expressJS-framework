var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Category unit test",function(){

    // #1 should return list of categories
    it("should return categories", function (done) {
        server
            .get("/categories")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });

    it("should return an category", function (done) {
        server
            .get("/categories/56c15b8b2f76773c1eaee8b5")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property('_id');
                res.body.name.should.equal('name_update');
                res.body.description.should.equal('desc_update');
                done();
            });
    });

    it('should return success to create new category', function(done) {
        var category = {
            name: 'name test',
            description: 'description test'
        };
        server
            .post('/categories')
            .send(category)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.status.should.equal(200);
                done();
            });
    });

    it('should correctly update an existing category', function(done){
        var category = {
            name: 'name_update',
            description: 'desc_update'
        };
        server
            .put('/categories/56c15b8b2f76773c1eaee8b5')
            .send(category)
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err,res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property('_id');
                res.body.name.should.equal('name_update');
                res.body.description.should.equal('desc_update');
                done();
            });
    });

   it('should correctly delete an existing category', function(done){
        server
            .delete('/categories/56c0be40ccc3b69c0afee135')
            .expect(200) //Status code
            .end(function (err, res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });
});