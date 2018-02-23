import axios from 'axios';

const api = ({route}) => {
	return axios
		.get(route)
		.then(res => res.data);
};

export default api;
