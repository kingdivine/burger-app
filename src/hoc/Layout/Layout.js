import React, {Component} from 'react';
import {connect} from 'react-redux';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer  : false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({
            showSideDrawer : false
        });
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState) =>({
           showSideDrawer : !prevState.showSideDrawer
        }));
    }

    render(){
        return(
            <>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}
                    isAuthenticated={this.props.isAuthenticated} />
                    <main className={styles.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
    
};


const mapStateToProps = (state) =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);