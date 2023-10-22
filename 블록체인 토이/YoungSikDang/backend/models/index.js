const Sequelize =require("sequelize");
const config  = require("../config");
const Menus = require("../models/menus");
const Orders = require("../models/orders");

const sequelize = new Sequelize(config.dev);

const db ={};
db.sequelize = sequelize;
db.Menus = Menus;
db.Orders = Orders;

Menus.init(sequelize);
Orders.init(sequelize);

module.exports = db;