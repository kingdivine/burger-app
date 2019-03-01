import React, { Component } from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth}/>
        <Redirect to="/"/>
      </>
    );
    if(this.props.isAuthenticated){
      routes = (
        <>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/logout" component={Logout}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Redirect to="/"/>
        </>
      );
    }
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    isAuthenticated: state.auth.token !== null 
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
