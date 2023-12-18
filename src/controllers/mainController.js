const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const {loadProducts,storeProducts,loadUsers,storeUsers} = require('../data/moduleFs')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainControllers = {
	index: (req, res) => {
		let products = loadProducts()
		res.render('index',{products ,toThousand})
		
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = mainControllers;
