'use strict';

module.exports = (router) => {

	const user    = require('../model/user');
	const factory = require('../factory/user');

	router
	    .get('/', (req, res, next) => {
		  res.render('users');
		})
		.get('/user', (req, res, next) => {
			user.all().then((results) => {
				res.json(results.map(user => new factory(user)));
			}).fail((err) => {
				res.json(err);
			});
		})
		.post('/user', (req, res, next) => {
        	user.create(req.query).then((results) =>{
				res.json(results.map(user => new factory(user)));
			}).fail((err) => {
				res.json(err);
			});
        })
		.get('/user/:id', (req, res) => {
			user.get(req.params.id).then((results) => {
				res.json(results.map(user => new factory(user)));
			}).fail((err) => {
				res.json(err);
			});
		})
		.put('/user/:id', (req, res, next) => {
   			user.update(req.params.id, req.query).then((results) =>{
				res.json(results.map(user => new factory(user)));
			}).fail((err) => {
				res.json(err);
			});	
        })
        .delete('/user/:id', (req, res, next) => {
        	user.delete(req.params.id).then((results) => {
				res.json(results.map(user => new factory(user)));
			}).fail((err) => {
				res.json(err);
			});
        });

}
