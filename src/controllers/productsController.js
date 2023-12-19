const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { uuid } = require('uuidv4')

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
		res.render('product-create-form')

	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name,price,discount,category,description,image} = req.body;
		const products = loadProducts()
		products.push(
			{
				id: uuid(),
				name:name.trim(),
				price:+price,
				discount: discount,
				category: category,
				description:description.trim(),
				image: 'default-image.png'
			}
		)
		storeProducts(products)
		res.redirect('/products')
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
	destroy: (req, res) => {
		const {id} = req.params;
		const products = loadProducts();
 		const productosNoDestoy = products.filter(product => product.id !== id);
		storeProducts(productosNoDestoy);
		res.redirect('/products')
	}
};

module.exports = productsControllers;