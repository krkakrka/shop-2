import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { DatePicker } from '../';
import './ProductsCartSummary.css';

// todo currency synbols and count.
// right now assuming count always 1 and currency always EUR
function ProductLine({ product, count }) {
  return (
    <div>{
      `${product.name} ${product.price} EUR`
    }</div>
  );
}

function ProductLines({ productsWithCount }) {
  return (
    <div>{
      productsWithCount.map(({ product, count }) => (
        <ProductLine product={product} count={count} key={product.id} />
      ))
    }</div>
  );
}

function Summary({ productsWithCount }) {
  // more readable version
  const initialTotalPrice = 0;
  const totalPrice = productsWithCount.reduce(
    (totalPriceSoFar, currentProductWithCount) => {
      return totalPriceSoFar + Number(currentProductWithCount.product.price) * currentProductWithCount.count;
    },
    initialTotalPrice
  );
  return (
    <div>{`Total price: ${totalPrice}`}</div>
  );
}

function ProductsCartSummary(props) {
  const { cart, onOrder } = props;

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = date => setSelectedDate(date);

  const [address, setAddress] = React.useState('');
  const handleAddressChange = event => setAddress(event.target.value);

  const [note, setNote] = React.useState('');
  const handleNoteChange = event => setNote(event.target.value);

  const handleOrder = () => {
    onOrder({
      date: selectedDate,
      address,
      note,
      cart
    });
  };

  return (
    <div className="ProductsCartSummary-container">
      <ProductLines productsWithCount={cart} />
      <Summary productsWithCount={cart} />

      <TextField value={address} onChange={handleAddressChange} label="Address" />
      <DatePicker value={selectedDate} onChange={handleDateChange} />
      <TextField value={note} onChange={handleNoteChange} label="Note" />
      <Button onClick={handleOrder} variant="contained" color="primary">Order!</Button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onOrder: (order) => dispatch({ type: 'ON_ORDER', order })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCartSummary);