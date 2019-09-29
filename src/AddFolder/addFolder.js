import React, {Component} from "react";
import PropTypes from 'prop-types';

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
        const url =''
        const options = {
            method: 'POST',
            body: JSON.stringify(name),
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer $2a$10$ZhdeJefcb.5sx/DCmO/n8u5sJLcARAdbHw9tfm1mevGRq3s1.5DpW"
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
        this.setState({
          title: "",
          url: "",
          description: "",
          rating: 1
        });
        this.props.handleAdd(name);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });

    }
    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
      }

    render() {

        return (
            <form className='createNewFolder' onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="name">New Folder</label>
                <input type="text" className="folder_name" name="name" id="name" 
                defaultValue="New Folder Name" onChange={e => this.updateName(e.target.value)}/>
                <button 
                    type="submit" 
                    className="newFolder__button"
                    disabled={
                        this.validateName()
                    }>Create Folder</button>
            </form>
        );
    }
}
export default AddFolder;