import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';


class MakeRowLiikeYhteensa extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.test1,
        };
    }

    render() {
        return (
            <Row middle="xs">
            <Col xs={5} sm={5} md={5} lg={2} className='vasen'>
               {this.props.val1}
            </Col>
            <Col xs={5} lg={2} className='keski'>
               {this.props.val2}
            </Col>
            <Col xs={5} lg={2} className='oikea'>
                {this.props.val3}
            </Col>
            <Col xs={5} lg={1}>

            </Col>
        </Row>
        )
    }
}

export default MakeRowLiikeYhteensa
