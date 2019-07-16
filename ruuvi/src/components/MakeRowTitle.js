import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignal, faTemperatureLow, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faSignal, faTemperatureLow, faArrowsAlt)

class MakeRowTitle extends Component {

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
                <b>{this.props.val1}</b> &nbsp;<FontAwesomeIcon icon={this.props.val2} />
            </Col>
        </Row>
        )
    }
}

export default MakeRowTitle
