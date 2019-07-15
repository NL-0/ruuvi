import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';

class MakeRowT extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.test1,
        };
    }

    render() {
        return (
            <Row>
                <Col xs={5} lg={2} className='vasen'>
                    <b>{this.props.val1}</b>
                </Col>
                <Col xs={5} lg={2} className='keski'>
                    <b>{this.props.val2}</b>
                </Col>
                <Col xs={5} lg={2} className='oikea'>
                    <b>{this.props.val3}</b>
                </Col>
                <Col xs={5} lg={3}> 

                </Col>
            </Row>
        )
    }
}

export default MakeRowT
