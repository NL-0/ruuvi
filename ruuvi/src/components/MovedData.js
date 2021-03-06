import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "react-flexbox-grid";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

/*
    joka 10 sec lataa mdata url joka kertoo jokaisen montako liikkumista tapahtunit kuluvan tunnin aikana ja piirtää siitä graafin
*/

class MovedData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moved1: [],
            data: [],
            liikeyhteensa: [],
            values: [],
            value1: "",
            value2: "",
            value3: "",
            influxmoved: 'http://10.100.0.119:5000/mdata',
            moveddata1: [],
            moveddata2: [],
            moveddata3: [],
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        this.movedaxios();
    };

    movedaxios() {
        axios.get(this.state.influxmoved).then(res => {
            const moveddata = res.data;
            this.setState({
                // value1: moveddata.results[0].series[0].values[0][1],
                // value2: moveddata.results[0].series[1].values[0][1],
                // value3: moveddata.results[0].series[2].values[0][1],
                // data: [{name: "", pv: this.state.value1, uv: this.state.value2,dv: this.state.value3}]
                value1: moveddata[0].count,
                value2: moveddata[1].count,
                value3: moveddata[2].count,
                data: [{name: "", pv: this.state.value1, uv: this.state.value2,dv: this.state.value3}]
            });
        });
        //console.log(this.state.moveddata)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={5} lg={2} />
                    <Col xs={5} lg={2}>
                        <b>Liikkeitä yhteensä viimeisen 1h aikana</b>
                    </Col>
                </Row>
                <br />
                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2} className="vasen">
                        {this.state.value1}
                    </Col>
                    <Col xs={5} lg={2} className="keski">
                        {this.state.value2}
                    </Col>
                    <Col xs={5} lg={2} className="oikea">
                        {this.state.value3}
                    </Col>
                    <Col xs={5} lg={1}>
                        <BarChart
                            width={500}
                            height={200}
                            className="chart"
                            data={this.state.data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar 
                                dataKey="pv" 
                                fill="grey" 
                                background={{ fill: "#eee" }}
                            />
                            <Bar
                                dataKey="uv"
                                fill="lightgreen"
                                background={{ fill: "#eee" }}
                            />
                            <Bar
                                dataKey="dv"
                                fill="lightblue"
                                background={{ fill: "#eee" }}
                            />
                        </BarChart>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MovedData;
