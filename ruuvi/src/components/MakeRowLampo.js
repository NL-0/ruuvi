import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';
import LiikeChart from './LiikeChart';
import Lampo from './Lampo';


/*
    Render Lampötilan ja poistaa ylimääräiset desimaalit <Lampö>
    <LiikeChart> piirtää graafisen näkymän arvoista
*/

class MakeRowLampo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.test1,
        };
    }

    render() {
        return (
            <Row middle="xs">
                <Col xs={5} lg={2} className='vasen'>
                    <Lampo lampo={this.props.val1} />
                </Col>
                <Col xs={5} lg={2} className='keski'>
                    <Lampo lampo={this.props.val2} />
                </Col>
                <Col xs={5} lg={2} className='oikea'>
                    <Lampo lampo={this.props.val3} />
                </Col>
                <Col xs={5} lg={3}> 
                <LiikeChart liike1={this.props.val1} liike2={this.props.val2} liike3={this.props.val3} />
                </Col>
            </Row>
        )
    }
}

export default MakeRowLampo
