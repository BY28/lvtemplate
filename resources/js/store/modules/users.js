import state from '../libs/state';
import mutations from '../libs/mutations';
import actions from '../libs/actions';
import getters from '../libs/getters';

export default{

    namespaced: true,

	state: {
		...state,
		form: new Form({
			id: '',
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
		}),
		api_url: 'api/users',
	}, 

	mutations:{
		...mutations,
	},

	actions:{
		...actions,
	},

	getters:{
		...getters,
	}

}