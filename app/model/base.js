'use strict';

const config = require('../../config').database;
const TYPES = require('tedious').TYPES;

const tp = require('tedious-promises');
tp.setConnectionConfig(config); // global scope 

const _ = require('lodash');
tp.setDefaultColumnRenamer(_.camelCase); // global scope 

module.exports = {
	config, TYPES, tp
};