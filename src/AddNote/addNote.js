import React, {Component} from "react";

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
    }
    validateName(fieldValue) {
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
                <label htmlFor="name">Note Name</label>
                <input type="text" className="note_name" name="name" id="name" 
                defaultValue="New Note" onChange={e => this.updateName(e.target.value)}/>
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