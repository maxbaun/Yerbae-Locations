export function errorMessage(err) {
	let message = err;

	if (err && err.response && err.response.data && err.response.data.messege) {
		return err.response.data.messege;
	}

	if (err.message) {
		return err.message;
	}

	return message;
}

export function errorHandler(err) {
	let message = err;

	if (err && err.response && err.response.data && (err.response.data.messege || err.response.data.modal)) {
		return {...err.response.data};
	}

	if (err.message) {
		return err.message;
	}

	return message;
}
