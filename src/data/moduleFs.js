const fs = require('fs')
const path = require('path')

const loadProducts = () => {
    const productsFilePath = path.join(__dirname,'./productsDataBase.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));
    return products
}

const storeProducts = (products) =>{
    const productsFilePath = path.join(__dirname,'./productsDataBase.json');
    fs.writeFileSync(productsFilePath,JSON.stringify(products),'utf-8');
}

const loadUsers = () => {
    const usersFilePath = path.join(__dirname,'./usersDataBase.json');
    const users = JSON.parse(fs.readFileSync(usersFilePath,'utf-8'));
    return users;
}

const storeUsers = (users) => {
    const usersFilePath = path.join(__dirname,'./usersDataBase.json');
    fs.writeFileSync(usersFilePath, JSON.stringify(user,null,3),'utf-8');
}

module.exports = {
    loadProducts,
    storeProducts,
    loadUsers,
    storeUsers
}

