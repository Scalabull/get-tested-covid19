import React from 'react';
import classnames from 'classnames';

// reactstrap components
import {
    Button,
    Form,
    FormGroup,
    Input,
    Row,
} from 'reactstrap';

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

class HomeZipForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.searchZip };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let updateVal = event.target.value;
        if (updateVal === '' || isNumeric(updateVal)) {
            this.setState({ value: updateVal });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let submitVal = this.state.value;
        if (
            submitVal !== null &&
            submitVal !== undefined &&
            submitVal.length === 5 &&
            isNumeric(submitVal)
        ) {
            this.props.onSubmit(submitVal);
            window.scroll( { left:0, top: document.getElementsByClassName( "search-header")[0].scrollHeight, behavior: 'smooth'})
        }
        // event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.top = "-200px"
    }

    render() {
        return (

            <Form onSubmit={this.handleSubmit} inline>
                    <FormGroup
                        className={classnames({
                            focused: this.state.searchFocused
                        })}
                    >
                        <Row form>
                            <Input
                                className='mr-0 pr-12 search-input form-control form-control-lg'
                                title='Enter Zip Code (5 digit)'
                                placeholder='Enter Zip Code (5 digit)'
                                type='text'
                                maxLength='5'
                                autoFocus={true}
                                onFocus={(e) =>
                                    this.setState({ searchFocused: true })
                                }
                                onBlur={(e) =>
                                    this.setState({ searchFocused: false })
                                }
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Button className='search-button' type='submit' color='info'>
                                Search
                            </Button>
                        </Row>
                    </FormGroup>
            </Form>
        );
    }
}

export default HomeZipForm;
