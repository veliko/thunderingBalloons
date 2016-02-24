var addAddress = function (addressesList, callback) {
	var address = $('#address').val();
	addressesList.push(address);
	callback({addressesList: addressesList});
}

window.addAddress = addAddress;