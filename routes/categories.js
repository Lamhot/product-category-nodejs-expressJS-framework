var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../models/Category.js');

/* GET /categories listing. */
router.get('/', function(req, res, next) {
  Category.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /categories */
router.post('/', function(req, res, next) {
  Category.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /categories/id */
router.get('/:id', function(req, res, next) {
  Category.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /categories/:id */
router.put('/:id', function(req, res, next) {
  Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /categories/:id */
router.delete('/:id', function(req, res, next) {
  Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;