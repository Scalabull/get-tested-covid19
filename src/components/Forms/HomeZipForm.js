
import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Button,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Col
} from "reactstrap";

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

class HomeZipForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
        let updateVal = event.target.value;
        if(updateVal === "" || isNumeric(updateVal)){
            this.setState({value: updateVal});
        }
    }
    
    render() {
        let { onSubmit } = this.props;
        
        return (
            <>
                <Col lg="4" sm="6" xs="8" className="mt-3 mr-0 pr-0">
                    <FormGroup
                    className={classnames({
                        focused: this.state.searchFocused,
                        "mr-0": true,
                        "pr-0": true
                    })}
                    >
                    <InputGroup className="mb-4 mr-0 pr-0">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-zoom-split-in" />
                        </InputGroupText>
                        </InputGroupAddon>
                        <Input
                        className="mr-0 pr-0"
                        placeholder="ENTER ZIP CODE (5 DIGIT)"
                        type="text"
                        maxLength="5"
                        onFocus={e => this.setState({ searchFocused: true })}
                        onBlur={e => this.setState({ searchFocused: false })}
                        value={this.state.value}
                        onChange={this.handleChange}
                        />
                    </InputGroup>
                    </FormGroup>
                </Col>
                <Col lg="4" sm="6" xs="4" className="mt-3 ml-0 pl-0">
                    <Button 
                        className="btn-square btn-info"
                        onClick={() => this.props.onSubmit(this.state.value)}
                    >SEARCH</Button>
                </Col>
            </>
        );
  }
}

export default HomeZipForm;
