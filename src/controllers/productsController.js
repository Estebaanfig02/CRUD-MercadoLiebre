const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const {loadProducts,storeProducts,loadUsers,storeUsers} = require('../data/moduleFs')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsControllers = {
	// Root - Show all products
	index: (req, res) => {
		const products = loadProducts()
		res.render('products', {products})
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

	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params
		const products = loadProducts()
		const productToEdit = products.find((product) => product.id == id)
		res.render('product-edit-form', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params;
		const {name,price,discount,category,description,image} = req.body;
		const products = loadProducts();
		const nuevoArray = products.map(product => {
			if(product.id == id){
				return{
					id,
					name: name ? name.trim() : product.name,
					price: price ? +price : product.price,
					discount: discount ? discount : product.discount,
					category: category ? category : product.category,
					description:description.trim(),
					image: image ? image : product.image
				}
			}
			return product
		})
		storeProducts(nuevoArray)
		res.redirect(`/products/detail/${id}`);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = +req.params.id;
		const archivoJSON = loadProducts();
 		const productosNoDestoy = archivoJSON.filter(product => product.id !== id)
			res.send(productosNoDestoy)
			storeProducts(productosNoDestoy);
			returnres.redirect('./products')
	}
};

module.exports = productsControllers;