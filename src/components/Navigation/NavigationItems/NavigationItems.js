import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>{
    const signInOut = (
        props.isAuthenticated ? 
             <NavigationItem link="/logout">Sign Out</NavigationItem>
            : <NavigationItem link="/auth">Sign In</NavigationItem>
    );
    return(
        <ul className={styles.NavigationItems}>
           <NavigationItem link="/" exact >Burger Builder</NavigationItem>
           {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null} 
           {signInOut}
        </ul>
    )
}

export default navigationItems;