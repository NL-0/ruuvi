import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';

class MakeRowTitleNoIcon extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.test1,
        };
    }

    render() {
        return (
            <Row>
            <Col xs={5} lg={2}>
            </Col>
            <Col xs={5} lg={2}>
                <b>{this.props.val1}</b>
            </Col>
        </Row>
        )
    }
}

export default MakeRowTitleNoIcon
