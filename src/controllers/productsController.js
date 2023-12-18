const fs = require('fs');
const path = require('path');

const {loadProducts,storeProducts,loadUsers,storeUsers} = require('../data/moduleFs')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsControllers = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products')
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params
		const productsList = loadProducts()
		const productDetail = productsList.find((product) => product.id == id)
		res.render('detail',{productDetail})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = productsControllers;