'use strict';

const transformResultsToResult = (results, factory) => {
	return (results.length > 0 ? new factory(results[0]) : {});
};

const all = (model, factory, req, res) => {
	model.all().then(function(results) {
		res.json(results.map(item => new factory(item)));
	}).fail(err => {
		res.json(err);
	});
};

const get = (model, factory, req, res, _result = true) => {
	model.get(req.params.id).then((results) => {
		let result;
		if (_result) {
			result = transformResultsToResult(results, factory)
		} else {
			result = results;
		}
		res.json(result);
	}).fail(err => {
		res.json(err);
	});
};

const post = (model, factory, req, res) => {
	let params = (req.body || req.query);
	params = (typeof params === 'string' ? JSON.parse(params) : params);

	model.post(params).then(results => {
		res.json(transformResultsToResult(results, factory));
	}).fail(err => {
		res.json(err);
	});
};

const put = (model, factory, req, res) => {
	let params = (req.body || req.query);
	params = (typeof params === 'string' ? JSON.parse(params) : params);

	model.put(req.params.id, params).then(results => {
		res.json(transformResultsToResult(results, factory));
	}).fail(err => {
		res.json(err);
	});	
};

const _delete = (model, factory, req, res) => {
	model.delete(req.params.id).then(results => {
		res.json(transformResultsToResult(results, factory));
	}).fail(err => {
		res.json(err);
	});
};

module.exports = {
	execute: {
		all, get, post, put,
		delete: _delete
	}
};