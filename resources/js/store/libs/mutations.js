
export default{
	
	fill(state, payload){ // Fill the array
		state.data = payload;
	},

	add(state, payload){ // Adds an element to the first element of the array
		state.data.unshift(payload);
	},


	update(state, payload){ // Updates a specific element in the array
		state.data.splice(state.current_index, 1, payload);
	},

	delete(state, payload){ // Deletes a specific element of the array 
		state.data.splice(payload, 1);
	},
	
	edit(state, payload){
		state.form.reset();
		state.isEdit = true; // setting edit state to true
		state.form.fill(payload.element);
		// Object.assign(state.form, payload.element); // assign values to object

		state.current_index = payload.index;
	},

	resetEdit(state, payload)
	{
		state.isEdit = false;
		state.current_index = '';
		state.form.reset();
	},

	isEdit(state){
		return state.isEdit;
	},
}