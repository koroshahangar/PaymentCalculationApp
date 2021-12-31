import React, { Component } from 'react';
import Calculation from './CalculationComponent';

class Main extends React.Component {
  backend_url = process.env.BACKEND_URL || 'localhost';
  backend_port = process.env.BACKEND_PORT || '8080';

  constructor(props) {
      super(props);      
      this.state = {
        products: [],
        customer_id: 0,
        quantities: [],
        calculation: null
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
      this.handleCustomerChange = this.handleCustomerChange.bind(this);
    }

    handleCustomerChange(event) {
      if (!isNaN(parseInt(event.target.value)))
        this.setState({customer_id: parseInt(event.target.value)});
      else 
        alert("Customer ID should be a numebr");
    }

    handleQuantityChange(event) {
      let newQuantities = new Map(this.state.quantities);
      newQuantities.set(
                parseInt(event.target.dataset.productid), 
                parseInt(event.target.value)
                );
      this.setState({
        quantities: newQuantities
      });      
    }
  
  
    handleSubmit(event) {
      event.preventDefault();
      let calculateReq = {
        customer_id: this.state.customer_id,
        items: this.state.products.map((item) => {
          return {
            item_id: item.id,
            quantity: this.state.quantities.get(item.id)
          };
        })
      };
      fetch(`http://${this.backend_url}:${this.backend_port}/calculate`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(calculateReq)
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({calculation: response});
      })
      .catch(e => {
        console.log("Failed to calculate the results");
        console.log(e);
      });
      
    }
  
    componentDidMount() {
      this.callAPI();      
    }

    callAPI() {
      console.log(`Backend URL: ${this.backend_url}`)
      console.log(`Backend Port: ${this.backend_port}`)
      fetch(`http://${this.backend_url}:${this.backend_port}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log("Failed to reach the backend");
      });
  
      // fetch(`http://${this.backend_url}:${this.backend_port}/customers`)
      // .then(response => response.json())
      // .then(response => {
      //   this.setState({
      //     customers: response
      //   })
      // })
      // .catch(e => {
      //   console.log("Failed to fetch the customers");
      // });
      fetch(`http://${this.backend_url}:${this.backend_port}/products`)
      .then(response => response.json())
      .then(products => {
        let productQuantities = products.map((product) => {
          return [product.id, 0]
        });
        this.setState({
          products: products,
          quantities: new Map(productQuantities)
        });
      })
      .catch(e => {
        console.log("Failed to fetch the products");
      });
    }

    render() {
      console.log(this.state);
      return (
        <div>
          <form>
            <div className="customerInfo">
            <label htmlFor="customerID">Customer ID:</label>
            <input type="text" id="customerID" name="customerID"
                value={this.state.customer_id}
                onChange={this.handleCustomerChange}
            ></input>
            </div>          
            <fieldset className="products">
            <legend>Shopping Basket:</legend>
            {this.state.products.map((product) => {
            return (
                <div className="product" key={product.id + "_input"}>
                <label htmlFor={product.id + "_quantity"}># of {product.name}s:</label>
                <input 
                    type="number" id={product.id + "_quantity"} name={product.id + "_quantity"} 
                    min="0"
                    data-productid={product.id} 
                    value={this.state.quantities.get(product.id)}
                    onChange={this.handleQuantityChange}
                    ></input>
                </div>
            );
            })}
            </fieldset>
            <button type="button" onClick={this.handleSubmit}>Calculate</button>
          </form>
          <Calculation apiResponse={this.state.calculation} />
        </div>
      );
    }
  }

  export default Main;