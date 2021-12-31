import './App.css';
import React, { Component } from 'react';
import Main from './components/MainComponent';


class App extends Component {

  render(){
    return (
      <div className="App">
        {/* <header className="App-header">
          
          Hello!
          <br></br>
          {this.state.customers.map((customer) => {
            return (
              <div key={customer.id}>
                {customer.name} from {customer.country}
              </div>
            );
          })}
          {this.state.products.map((product) => {
            return (
              <div key={product.id}>
                {product.name} with price ${product.price}
              </div>
            );
          })}
        </header> */}
        <Main />
      </div>
    );
  }

}

export default App;
