var optionsCost;
var shippingCost;
var sizeCost;
var salesTax;
var finalCost;

function calculateTotal() {
	finalCost = 0.00;
	
	optionsCost = orderForm.grand_total.value;
	alert ("Options total is " + optionsCost);
	//to complete
	
	
	shippingCost = orderForm.finalShip.value;
	alert("Shipping cost is " + shippingCost);
	
	shippingCost = orderForm.sizeCost.value;
	alert("Shipping cost is " + sizeCost);
	
	finalCost = accounting.unformat(optionsCost) + accounting.unformat(shippingCost) + accounting.unformatsizeCost;
	alert("fincalCost = " + finalCost);
	
	salesTax = 0.6 * finalCost;
	alert("sales tax = " + salesTax);
	
	finalCost += salesTax;
	finalCost = accounting.formatMoney(finalCost);
	alert ("True final cost is " + finalCost)
}



function setSize(size) {
	var price = 0.0;
	document.getElementById("mySize").value = size;

	if (size == "Small") {
		price = 20.95;
		document.getElementById("lineSize").value = price;
	} else if (size == "Medium") {
		price = 35.95;
		document.getElementById("lineSize").value = price;
	} else if (size == "Large") {
		price = 50.95;
		document.getElementById("lineSize").value = price;
	} else {
		document.getElementById("lineSize").value = "error";
	}
}

function setShipper() {
	var shipDropDown = document.getElementById("selectShipper")
	var displayShipper = document.getElementById("previewShipper");
	var price;

	if (shipDropDown.options[shipDropDown.selectedIndex].text == "USPS") {
		price = parseFloat(20.95);
		displayShipper.value = "USPS - $20.95";
		document.orderForm.finalShip.value = accounting.formatMoney(price);

	} else if (shipDropDown.options[shipDropDown.selectedIndex].text == "UPS") {
		price = parseFloat(24.95);
		displayShipper.value = "UPS - $24.95";
		document.orderForm.finalShip.value = accounting.formatMoney(price);
		;
	} else if (shipDropDown.options[shipDropDown.selectedIndex].text == "FedEx") {
		price = parseFloat(29.95);
		displayShipper.value = "FedEx - $29.95";
		document.orderForm.finalShip.value = accounting.formatMoney(price);
		;
	} else if (shipDropDown.options[shipDropDown.selectedIndex].text == "Pick Up") {
		price = parseFloat(0.00);
		displayShipper.value = "PickUp - $0.00";
		document.orderForm.finalShip.value = accounting.formatMoney(price);
	}
}

function get_data(orderForm) {
	var order_data = "This Order is...\n";
	for ( i = 0; i < orderForm.line.length; i++) {
		if (orderForm.line[i].value == "")
			orderForm.line[i].value = "0";
		order_data += "Line " + i + ", Qty = " + orderForm.line[i].value + ", Cost = $" + orderForm.line_sum[i].value + "\n";

	}
	if (orderForm.grand_total.value == "") {
		orderForm.grand_total.value = "Nothing yet";
	}
	order_data += "Total Order value = " + orderForm.grand_total.value;
	document.confirmationForm.order.value = order_data;

}

function count(orderForm, lineNumber, itemCost) {
	orderForm.line_sum[lineNumber].value = orderForm.line[lineNumber].value * itemCost;

	var grandTotal = 0;
	for ( i = 0; i < orderForm.line_sum.length; i++) {
		grandTotal += Math.ceil(orderForm.line_sum[i].value * 1000) / 1000;

	}
	grandTotal = Math.round(grandTotal * 1000) / 1000;
	orderForm.grand_total.value = accounting.formatMoney(grandTotal);
}

function init() {
	document.orderForm.reset();
	document.orderForm.line[0].select();
	document.orderForm.line[0].focus();
	document.confirmationForm.order.value = "";
}

window.onload = init;
