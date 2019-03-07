import React, { Component, Suspense } from 'react';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth}/>
        <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Suspense fallback={<Spinner/>} >
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Redirect to="/"/>
          </Switch>
        </Suspense>
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
