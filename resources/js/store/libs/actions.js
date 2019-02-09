
export default{

	_get({commit, state}, payload){
		return new Promise((resolve, reject) => {
			state.form.get(state.api_url)
			.then(response => {
				commit('fill', response.data.data);
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
		});
	},
	
	_store({commit, state}, payload){
		return new Promise((resolve, reject) => {
			state.form.post(state.api_url)
				.then(response => {
					commit('add', response.data.data);
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});

			});
	},

	_update({commit, state}, payload){
		return new Promise((resolve, reject) => {
			let url = state.api_url+'/'+state.form.id;
			state.form.put(url)
			.then(response => {
				commit('update', response.data.data);
				commit('resetEdit');
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
		});
	},

	_destroy({commit, state}, payload){
		return new Promise((resolve, reject) => {
			let url = state.api_url+'/'+payload.id;
			state.form.delete(url)
				.then(response => {
					commit('delete', payload.index);
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});

		});
	},

}