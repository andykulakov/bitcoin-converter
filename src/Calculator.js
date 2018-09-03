import React, {Component} from 'react';
import InputBit from './InputBit';
import InputUsd from './InputUsd';
import './Calculator.css';

const APIURL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

function toBitcoin(value, rate) {
  return value / rate;
}

function toUSD(value, rate) {
  return value * rate;
}

function convertCurrency(value, rate, convert) {
  const inputValue = parseFloat(value);
  const inputRate = parseFloat(rate);
  
  if(Number.isNaN(inputValue)) {
    return '';
  } 
  
  const output = convert(inputValue, inputRate);
  return output;
}

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      currency: 'bit',
      amount: '',
      rate: ''
    }
    
    this.handleChangeBit = this.handleChangeBit.bind(this);
    this.handleChangeUsd = this.handleChangeUsd.bind(this);
  }
  
  handleChangeBit(e) {
    this.setState({currency: 'bit', amount: e.target.value})
  } 
  
  handleChangeUsd(e) {
    this.setState({currency: 'usd', amount: e.target.value})
  }
  
  componentWillMount() {
    fetch(APIURL)
    .then(data => data.json())
    .then(data => this.setState({rate: data.bpi.USD.rate_float}));
  }
  
  
  render() {
    const {amount} = this.state;
    const {currency} = this.state;
    const {rate} = this.state;
    
    return (
      <div className="calculator">
        <h1>Bitcoin to USD Converter</h1>
        <InputBit 
          currency="bit"
          handleChange={this.handleChangeBit} 
          value={(currency === 'bit') ? amount : convertCurrency(amount, rate, toBitcoin)}
        />
        <InputUsd 
          currency="usd"
          handleChange={this.handleChangeUsd} 
          value={(currency === 'usd') ? amount : convertCurrency(amount, rate, toUSD)}
        />
      </div>
    );
  }
}

export default Calculator;