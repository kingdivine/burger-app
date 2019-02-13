import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state ={
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(response =>{
                const orders = Object.entries(response.data).map( order =>(
                     <Order
                        key={order[0]}
                        price={order[1].price}
                        ingredients={order[1].ingredients}
                    />
                ))
                this.setState({ 
                    loading : false,
                    orders: orders
                });
            })
            .catch(error => { 
                this.setState({loading: false});
                console.log(error);
            })
           
    }

    render(){
        return(
            <div>
                {this.state.orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);