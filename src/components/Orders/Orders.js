import React from 'react';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';
import { ProductsCollection } from '../';

// todo move to utils
function countCartProducts(cart) {
  return _.sumBy(cart, productWithCount => productWithCount.count);
}

function OrderRow({ order }) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{`${order.date} to ${order.address} - ${countCartProducts(order.cart)} products`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ProductsCollection products={order.cart.map(productWithKey => productWithKey.product)} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

function Orders({ orders }) {
  return (
    <div>
      {orders.map((order, index) => <OrderRow key={index} order={order} />)}
    </div>
  );
}

function mapStateToProps(state) {
  return { orders: state.orders };
}

export default connect(mapStateToProps)(Orders);;
