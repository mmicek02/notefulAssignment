import React, {Component} from "react";
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/validationError'

// AddFolder.propTypes = {
//     value: PropTypes.string.isRequired
//   };
  

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            }
        }
    }
    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true
            }
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const {name} = this.state;
        console.log('Name: ', name.value);
        const url ='http://localhost:9090/folders'
        const options = {
            method: 'POST',
            body: JSON.stringify(name),
            headers: {
            }
        };

        fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {
        console.log(this.state.name);
        // this.setState({
        //   name: this.state.name,
        // });
        this.props.handleAdd(this.state.name.value);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });

    }
    validateName() {
      console.log(this.state.name);
      console.log(this.state.name.value);
      console.log(this.state.name.value.trim());  
      const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
      }

    render() {
       const nameError = this.validateName();
        return (
            <form 
              className='createNewFolder' 
              onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="name">New Folder</label>
                <br />
                <input 
                  type="text" 
                  className="folder_name" 
                  name="name" 
                  id="name" 
                  defaultValue="New Folder Name" 
                  onChange={e => this.updateName(e.target.value)}/>
                  {this.state.name.touched && <ValidationError message={nameError} />}
                  <br />
                <button 
                    type="submit" 
                    className="newFolder__button"
                    disabled={
                        this.validateName()}>
                  Create Folder
                </button>
            </form>
        );
    }
}
export default AddFolder;