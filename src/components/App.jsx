import React, { Component } from 'react';
import ProductList from './ProductList';
import CreateProduct from './CreateProduct';
import axios from 'axios';


 const stateClearData = {
        id: 0,
        productName: '',
        category: {},
        description: '',
        price: '',
    };
class App extends Component {
    state = {
        products: [],
        form: {
            id: 0,
            name: '',
            category: {},
            description: '',
            price: '',
        },
    };

    async componentDidMount() {
        const response = await axios.get('http://localhost:3001/api/products');
        this.setState({products: response.data}); 
    }

    onUpdateProduct() {
        const { products: previousProducts, form } = this.state;
        const products = previousProducts.map((product)=> {
            if(product.id === form.id) {
                product.productName = form.productName;
                product.category = form.category;
                product.description = form.description;
                product.price = form.price;
            }
            return product;
        });
        this.setState( {products, form: {...stateClearData} } );
        
    }

    async onCreateProduct() {
        const { products, form } = this.state;
        if (form.id) {
            this.onUpdateProduct();
            return;
        }
        const newProduct = {
            name: form.name,
            categoryId: JSON.parse(form.category)._id,
            price: form.price,
        };
        const { data } = await axios.post('http://localhost:3001/api/products', newProduct);
        this.setState( {products: [...products, data], 
            form: {...stateClearData},
         });
    }

    onDeleteProduct(productId) {
        const { products: previousProducts } = this.state;
        const products = previousProducts.filter((product) => product.id !== productId);
        this.setState({ products });
    }

    onInputChage(event) {
        const form = {...this.state.form};
        form[event.currentTarget.name] = event.currentTarget.value;
        this.setState({ form });
    }
   
    onSelectProduct(product){
       this.setState({ form: {...product} });   

    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-md 4">
                        <CreateProduct 
                        product={this.state.form}
                        onCreateProduct={(product) => this.onCreateProduct(product)}
                        onInputChage={(event) => this.onInputChage(event)}
                        />
                    </div>
                <div className="col-md-8">
                    <ProductList products={this.state.products}                
                    onDelete={(productId) => this.onDeleteProduct(productId)}
                    onSelect={(product) => this.onSelectProduct(product)}
                    />
                </div>
            </div>
            </div>
        );
    }
}

export default App;
