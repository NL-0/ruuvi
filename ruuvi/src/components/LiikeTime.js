import React, { Component } from 'react'

class LiikeTime extends Component {


    constructor(props) {
        super(props)
        const { liiketime } = props;
        this.state = {
            liiketime1: liiketime
        };
      }
    

    render() {
        return (
            <div>
                123{this.state.liiketime}123
            </div>
        )
    }
}

export default LiikeTime
