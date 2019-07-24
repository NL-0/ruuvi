import React, { Component } from 'react'
import axios from "axios";

class CSVData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvurl: "http://10.100.0.119:5000/csv",
            csvdata: [],
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        this.axiosurl();
        //Lopeta timer kun data on saatu
        if (this.state.csvdata.length > 0) {
            // this.state.arduinochart.shift();
            clearInterval(this.timerID);
        }
        console.log(this.state.csvdata)
    }

    async axiosurl() {
        await axios.get(this.state.csvurl)
            .then(res => {
                const resdata = res.data;
                this.setState({
                    csvdata: resdata,
                })
            })
    }

    render() {
        return (
            <div>
                konsoli logi
            </div>
        )
    }
}

export default CSVData
