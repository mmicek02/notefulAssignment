import React, {Component} from "react";
import PropTypes from 'prop-types';

// AddNote.propTypes = {
//     value: PropTypes.string.isRequired
//   };

class AddNote extends Component {
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
        const url ='./http://localhost:9090/notes'
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
        this.setState({
          name: "",
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
            <form className='createNewNote' onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="name">Add Note</label> 
                <br/>
                <input type="text" className="note_name" name="name" id="name" 
                defaultValue="New Note" onChange={e => this.updateName(e.target.value)}/>
                <br />
                <button 
                    type="submit" 
                    className="newNote__button"
                    disabled={
                        this.validateName()
                    }>Create Note</button>
            </form>
        );
    }
}
export default AddNote;