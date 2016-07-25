'use strict';

const moment = require('moment');
const base   = require('../model/base');

const all = () => {
	return base.tp.sql("select id, name, datebirth from [user]")
		.execute();
};

const get = (id) => {
	return base.tp.sql("select id, name, datebirth from [user] where id = @id")
		.parameter('id', base.TYPES.Int, id)
		.execute();
};

const post = (user) => {
	user.datebirth = moment(user.datebirth, "DD/MM/YYYY")._d;
	return base.tp.sql('insert into [user] (name, datebirth) values (@name, @datebirth)')
		.parameter('name', base.TYPES.VarChar, user.name)
		.parameter('datebirth', base.TYPES.DateTime, new Date(user.datebirth))
		.execute();
};

const put = (id, user) => {
	user.datebirth = moment(user.datebirth, "DD/MM/YYYY")._d;
	return base.tp.sql('update [user] set name = @name, datebirth = @datebirth where id = @id')
		.parameter('id', base.TYPES.Int, parseInt(user.id))
		.parameter('name', base.TYPES.VarChar, user.name)
		.parameter('datebirth', base.TYPES.DateTime, new Date(user.datebirth))
		.execute();
};

const _delete = (id) => {
	return base.tp.sql('delete from [user] where id = @id')
		.parameter('id', base.TYPES.Int, parseInt(id))
		.execute();
};

module.exports = {
	all, get, post, put,
	delete: _delete
}