
import Errors from './Errors'

class Form{

	constructor(data)
	{

		this.original_data = data;

		for(let field in data)
		{
			this[field] = data[field];
		}

		this.errors = new Errors();

	}

	data()
	{
		
		let data = {};

		for(let property in this.original_data)
		{
			data[property] = this[property];
		}

		return data;
	}

	fill (data) 
	{
	    for(let property in data)
		{
			this[property] = data[property];
		}
  	}

	reset()
	{

		for(let field in this.original_data)
		{
			this[field] = '';
		}

		this.errors.clear();

	}

	post(url)
	{
		return this.submit('post', url);
	}

	put(url)
	{
		return this.submit('put', url);
	}

	delete(url)
	{
		return this.submit('delete', url);
	}

	get(url)
	{
		return this.submit('get', url);
	}

	submit(request_type, url)
	{
		return new Promise((resolve, reject) => {
			axios[request_type](url, this.data())
			.then(response => {
				this.onSuccess(response);
				resolve(response);
			})
			.catch(error => {
				this.onFail(error.response);
				reject(error.response);
			});
		});
	
	}

	onSuccess(response)
	{
		this.reset();
	}

	onFail(error)
	{
		this.errors.record(error.data.errors);
	}

	files(request_type, url, data)
	{
		return new Promise((resolve, reject) => {
			axios[request_type](url, data, {
			    headers: {
			      'Content-Type': 'multipart/form-data'
			    }
			})
			.then(response => {
				this.onSuccess(response);

				resolve(response);
			})
			.catch(error => {
				this.onFail(error.response);

				reject(error.response);
			});
		});
	}
}


export default Form;