"use strict";

function solveEquation(a, b, c) {
	let arr = [];

	let d = b ** 2 - 4 * a * c;

	if (d < 0) {}

	if (d === 0) {
		let root = -b / (2 * a);
		arr.push(root);
		return arr;
	}

	let root1 = (-b + Math.sqrt(d)) / (2 * a);
	let root2 = (-b - Math.sqrt(d)) / (2 * a);
	arr.push(root1, root2);

	return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {

	let monthlyPercent = percent / 100 / 12;

	let loanBody = amount - contribution;

	if (loanBody <= 0) {
		return 0;
	}

	let monthlyPayment = loanBody * (monthlyPercent + monthlyPercent / ((1 + monthlyPercent) ** countMonths - 1));

	let totalAmount = monthlyPayment * countMonths;

	return Number(totalAmount.toFixed(2));
}