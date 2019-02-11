import React, {Component} from 'react';
import styles from './Modal.module.css';
import BackDrop from '../Backdrop/Backdrop';


class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        const visibility = this.props.show ? styles.Show : styles.Hide
        const classes = [styles.Modal, visibility].join(' ');
        return(
            <>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes}>
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Modal;