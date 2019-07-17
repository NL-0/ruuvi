import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';
import './Inf.css';

class MakeRowBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.test1,
        };

    }

    render() {
        let box1 = {
            width: '100px',
            height: '20px',
            background: `${this.props.val1}`,
            display: 'table',
            margin: '0 auto',
        }
        let box2 = {
            width: '100px',
            height: '20px',
            background: `${this.props.val2}`,
            display: 'table',
            margin: '0 auto',
        }
        let box3 = {
            width: '100px',
            height: '20px',
            background: `${this.props.val3}`,
            display: 'table',
            margin: '0 auto',
        }

        return (
            <Row middle="xs">
            <Col xs={5} sm={5} md={5} lg={2}>
                <div style={box1}></div>
            </Col>
            <Col xs={5} lg={2}>
                <div style={box2}></div>
            </Col>
            <Col xs={5} lg={2}>
                <div style={box3}></div>
            </Col>
            <Col xs={5} lg={1}>

            </Col>
        </Row>
        )
    }
}

export default MakeRowBox
