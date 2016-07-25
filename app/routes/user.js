'use strict';

const base    = require('./base');
const model   = require('../model/user');
const factory = require('../factory/user');

module.exports = (router) => {
	router
		.get('/', (req, res, next) => {
		  res.render('users');
		})
		.get('/user', (req, res, next) => {
			base.execute.all(model, factory, req, res);
		})
		.post('/user', (req, res, next) => {
    	base.execute.post(model, factory, req, res);
    })
		.get('/user/:id', (req, res, next) => {
			base.execute.get(model, factory, req, res);
		})
		.put('/user/:id', (req, res, next) => {
 			base.execute.put(model, factory, req, res);	
    })
    .delete('/user/:id', (req, res, next) => {
    	base.execute.delete(model, factory, req, res);
    });
};