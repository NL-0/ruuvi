import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';

class MakeRowBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.test1,
        };
    }

    render() {
        return (
            <Row middle="xs">
            <Col xs={5} sm={5} md={5} lg={2}>
                <div style={this.props.val1}></div>
            </Col>
            <Col xs={5} lg={2}>
                <div style={this.props.val2}></div>
            </Col>
            <Col xs={5} lg={2}>
                <div style={this.props.val3}></div>
            </Col>
            <Col xs={5} lg={1}>

            </Col>
        </Row>
        )
    }
}

export default MakeRowBox
