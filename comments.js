// Create web server

// Import express
const express = require('express');
const router = express.Router();

// Import comments model
const Comments = require('../models/comments');

// Import mongoose
const mongoose = require('mongoose');

// Import body-parser
const bodyParser = require('body-parser');

// Import passport
const passport = require('passport');

// Import authenticate
const authenticate = require('../authenticate');

// Configure body-parser
router.use(bodyParser.json());

// Configure routes
router.route('/')
    .get((req, res, next) => {
        // Get all comments
        Comments.find({})
            .populate('author')
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        // Create new comment
        Comments.create(req.body)
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        // Update all comments
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        // Delete all comments
        Comments.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

router.route('/:commentId')
    .get((req, res, next) => {
        // Get comment by id
        Comments.findById(req.params.commentId)
            .populate('author')
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        // Create new comment
        res.statusCode = 403;
        res.end('POST operation