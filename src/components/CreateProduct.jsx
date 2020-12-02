import React, { Component } from 'react';
import axios from 'axios';


class CreateProduct extends Component {
    state = {
        categories: [],
        form: {
            id: 0,
            productName: '',
            category: '',
            description: '',
            price: '',
        },
    };

    async componentDidMount() {
        const response = await axios.get('http://localhost:3001/api/categories');
        this.setState({categories: response.data}); 
    } 

    onSubmit(event) {
        event.preventDefault();
        this.props.onCreateProduct();
    }

    render() {
        const { id, name, category, description, price } = this.props.product;
        return (
         <div>
             <h3>Product</h3>
             <form onSubmit={(event) => this.onSubmit(event)}>
                 <div className='form-group'>
                     <label>Product Name</label>
                     <input 
                     name='name'
                     type="text"
                     className='form-control'
                     value={name}
                     onChange={(event) => this.props.onInputChage(event)}
                     />
                 </div>
                 <div className='form-group'>
                     <label>Category</label>
                     <select className='custom-select'
                     name='category'
                     value={category._id}
                     onChange={(event) => this.props.onInputChage(event)}
                     >
                     {this.state.categories.map((category) => (
                         <option key={category._id} value={JSON.stringify(category)}>
                             {category.name}
                         </option>
                     ))}
                     </select>                    
                 </div>
                 <div className='form-group'>
                     <label>Description</label>
                     <input 
                     name='description'
                     value={description}
                     type="text" className='form-control' 
                     onChange={(event) => this.props.onInputChage(event)}
                    />
                 </div>
                 <div className='form-group'>
                     <label>Price</label>
                     <input 
                     name='price'
                     value={price}
                     type="text" className='form-control'
                     onChange={(event) => this.props.onInputChage(event)}
                    />
                 </div>
                 <div className='form-group'>
                     <button className='btn-btn-primary'>
                     {id ? 'Update': 'Add'}Product</button>
                 </div>
             </form>
         </div>   
        );
    }
}
export default CreateProduct;