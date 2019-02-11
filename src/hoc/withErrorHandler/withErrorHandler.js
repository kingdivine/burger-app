import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>{
    
    
    return class extends Component{
        state = {
            error: null
        }

        componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use(req => req, error => {
                this.setState({error:error});
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({error:error})
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
 
        render(){
            return(
                <>
                <Modal show={this.state.error}
                       modalClosed={this.errorConfirmedHandler}>
                    Oops! Something went wrong:
                    {this.state.error? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler;