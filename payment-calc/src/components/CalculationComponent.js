import React, { Component } from 'react';

class Calculation extends React.Component {

    render() {
        if (this.props.apiResponse == null)
            return (
                <div className="api-info">Please fill out the form and press the Calculate button to get the results</div>
            );
        if (this.props.apiResponse.error != undefined)
            return (
                <div className="api-info error">{this.props.apiResponse.error}</div>
            );
      return (
        <div className="calculation">
            <div className="customerName">
                <span>Customer Name:</span>
                <p>{this.props.apiResponse.customer_name}</p>
            </div>
            <div className="items">                
                <span>Items:</span>
                {this.props.apiResponse.items.map((item) => {
                    return (
                        <div>
                            <p>
                                {item.name} x {item.quantity}
                            </p>
                            
                            <pre>price: {item.price.toFixed(2)}</pre>
                            <pre>tax  : {item.tax.toFixed(2)}</pre>
                            <pre>total: {item.total.toFixed(2)}</pre>
                        </div>
                    );
                })}

            </div>
            <div className="summary">                
                <span>Summary:</span>
                <p>Subtotal: {this.props.apiResponse.subtotal.toFixed(2)}</p>
                <p>Tax: {this.props.apiResponse.tax.toFixed(2)}</p>
                <p>Total: {this.props.apiResponse.total.toFixed(2)}</p>
            </div>
            

        </div>
      );
    }
  }

  export default Calculation;