import axios from 'axios';

export default (params = {}) => {
	return axios.create(params);
};
