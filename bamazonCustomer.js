const inquirer = require('inquirer');
const MySQL= require('mysql'); 


/*Set up three functions: one for the show table
second for the initial prompt
third function for the second prompt
*/
const connection = MySQL.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
		if (err) throw err;
		console.log(JSON.stringify(res, null, 2));
		questionCustomer();
		
	})
	
});


function productPurchase(){
inquirer
	.prompt({
		name: "product",
		type: "input",
		message: "Give the item ID for your purchase."
	})
	.then(function(answer){
		var query = "SELECT product_name, price FROM products WHERE item_id = ?";
		connection.query(query,[
			answer.product
		]);
		//search function goes here


	});
}

//Create our inquirer questions

function questionCustomer(){
inquirer
	.prompt({
	name: "action",
	type: "list",
	message: "What would you like to do?",
	choices: [
		"Buy an item",
		"Keep browsing"
		]
	})
	.then(function(answer){
		switch (answer.action){
			case "Buy an item":
			productPurchase();
			break;
		}
	});
}
/* After the customer buys the item, then create a function that selects the quantity and
compares it to the Stock quantity in the database. If the customer's quantity is smaller than the stock quantity, 
decrement the stock quantity by the number of items purchased. */ 