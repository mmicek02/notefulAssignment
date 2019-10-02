import React, {Component} from 'react';

export default class CatchError extends Component.React {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
      }
      render() {
        if (this.state.hasError) {      
          return (
            <h2>Sorry, we could not create the folder.</h2>
          );
        }
        return this.props.children;
      }  
}

