import React, { Component } from 'react'
import axios from "axios";
import TimeChart from './TimeChart';
//import Button from '@material-ui/core/Button';



class MoveTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moved1: [],
            //1: http://10.100.0.119:5000/alltest?q=2019-07-17T10:35:00Z&q2=2019-07-17T10:40:00Z,

            //aurl: "http://10.100.0.119:5000/alltest?q=" + this.props.val1 + "Z&q2=" + this.props.val2 + "Z&mac1=" + this.props.mac1,
            //aurl: "http://10.100.0.119:5000/" + this.props.url,
            timeurlmac1: "http://10.100.0.119:5000/time2?q=" + this.props.val1 + "Z&q2=" + this.props.val2 + "Z&mac=" + this.props.mac3,
            timeurlmac2: "http://10.100.0.119:5000/time?q=" + this.props.val1 + "Z&q2=" + this.props.val2 + "Z&mac=" + this.props.mac2,
            timeurlmac3: "http://10.100.0.119:5000/time?q=" + this.props.val1 + "Z&q2=" + this.props.val2 + "Z&mac=" + this.props.mac1,
            timedata1: [],
            timedata2: [],
            timedata3: [],
            data1: [],
            data2: [],
            data3: [],
            data11: [],
            data22: [],
            data33: [],
            timemin: [],
            timemin2: [],
            datakeski: [],
            timer1: '2000',
            chartdata: [],
            datatime: [],
            chartkeski: [],
        };
    }
//http://10.100.0.119:5000/time?q=2019-07-17T10:35:43Z&q2=2019-07-17T10:40:44Z&mac=EF9F74296486
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), this.state.timer1);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        console.log(this.state.timeurlmac1)
        console.log(this.state.timeurlmac2)
        console.log(this.state.timeurlmac3)
        this.axiosurl();

        if ((this.state.timedata1) && (this.state.timedata1.length > 0)) {
           // console.log(`${this.state.timedata1.length}`)
           // console.log("timedata1: " + `${this.state.timedata1}`)

            for (var i = 0; i < this.state.timedata1.length; i++) {
                this.setState({
                    data1: [...this.state.data1, this.state.timedata1[i].mean],
                    datatime: [...this.state.datatime, this.state.timedata1[i].time],
                })
                //console.log(this.state.data1)
            }

        }
        if ((this.state.timedata2) && (this.state.timedata2.length > 0)) {
            // console.log(`${this.state.timedata1.length}`)
            // console.log("timedata1: " + `${this.state.timedata1}`)
 
             for (var y = 0; y < this.state.timedata2.length; y++) {
                 this.setState({
                     data2: [...this.state.data2, this.state.timedata2[y].mean]
                 })
                 //console.log(this.state.data2)
             }
 
         }
         if ((this.state.timedata3) && (this.state.timedata3.length > 0)) {
            // console.log(`${this.state.timedata1.length}`)
            // console.log("timedata1: " + `${this.state.timedata1}`)
 
             for (var z = 0; z < this.state.timedata3.length; z++) {
                 this.setState({
                     data3: [...this.state.data3, this.state.timedata3[z].mean]
                 })
                 //console.log(this.state.data3)
             }
 
         }

        if (this.state.data1 !== this.state.data11) {
            this.setState({
                data11: this.state.data1,
                data1: [],
            }) 
            this.state.data11.shift()
        }


        if (this.state.data2 !== this.state.data22) {
            this.setState({
                data22: this.state.data2,
                data2: [],
            })
            this.state.data22.shift()
        }

        if (this.state.data3 !== this.state.data33) {
            this.setState({
                data33: this.state.data3,
                data3: [],
            })
            this.state.data33.shift()
        }

        for (var q = 0; q < this.state.timedata1.length; q++) {

            if (this.state.data11[q] > 5) {
                this.setState({
                    chartdata: [...this.state.chartdata, {name: this.state.datatime[q], pv: '1', uv: this.state.data22[q], dv: this.state.data33[q]}], 
                    chartkeski:[...this.state.chartkeski, { name: this.state.datatime[q], pv: ('1' + this.state.data22[q] + this.state.data33[q]) / 3 }]
                })
            }
            else if (this.state.data22[q] > 5) {
                this.setState({
                    chartdata: [...this.state.chartdata, {name: this.state.datatime[q], pv: this.state.data11[q], uv: '1', dv: this.state.data33[q]}], 
                    chartkeski:[...this.state.chartkeski, { name: this.state.datatime[q], pv: (this.state.data11[q] + '1' + this.state.data33[q]) / 3 }]
                })
            }
            else if (this.state.data33[q] > 5) {
                this.setState({
                    chartdata: [...this.state.chartdata, {name: this.state.datatime[q], pv: this.state.data11[q], uv: this.state.data22[q], dv: '1'}], 
                    chartkeski:[...this.state.chartkeski, { name: this.state.datatime[q], pv: (this.state.data11[q] +this.state.data22[q] + 1) / 3 }]
                })
            }
            else {
                this.setState({
                    chartdata: [...this.state.chartdata, {name: this.state.datatime[q], pv: this.state.data11[q], uv: this.state.data22[q], dv: this.state.data33[q]}], 
                    chartkeski:[...this.state.chartkeski, { name: this.state.datatime[q], pv: (this.state.data11[q] +this.state.data22[q] + this.state.data33[q]) / 3 }]
                })
            }
        }

        //  for (var a = 0; a < this.state.data11; a++) {
        //     this.setState({
        //         chartkeski: [...this.state.chartdata, {name: this.state.datatime[a], pv: (this.state.data11[a] + this.state.data22[a] + this.state.data33[a]) / 3}]
        //     })
        //  }

        if ((this.state.data11.length > 1) && (this.state.data22.length > 1) && this.state.data33.length > 1) {
             clearInterval(this.timerID);
         }
         console.log(this.state.data11)
         console.log(this.state.data22)
         console.log(this.state.data33)

        // if ((this.state.timedata1) && (this.state.timedata1.length > 0)) {

        //     for (var y = 0; y < this.state.timedata1.length; y++) {
        //         this.setState({
        //             timemin: [...this.state.timemin, this.state.timedata1[y].values.length],

        //         })
        //     }

        //     this.setState({
        //         min: (Math.min(...this.state.timemin) - 1)
        //     })

        //     for (var i = 0; i < this.state.min; i++) {
        //         if (this.state.timedata1[0].values[i][1] > 10) {
        //             this.setState({
        //                 data: [...this.state.data, { name: this.state.timedata1[0].values[i][0], pv: '1', uv: this.state.timedata1[1].values[i][1], dv: this.state.timedata1[2].values[i][1] }],
        //                 datakeski: [...this.state.datakeski, { name: this.state.timedata1[0].values[i][0], pv: (1 + Number(this.state.timedata1[1].values[i][1]) + Number(this.state.timedata1[2].values[i][1])) / 3 }]
        //             })
        //         }
        //         else if (this.state.timedata1[1].values[i][1] > 10) {
        //             this.setState({
        //                 data: [...this.state.data, { name: this.state.timedata1[0].values[i][0], pv: this.state.timedata1[0].values[i][1], uv: '1', dv: this.state.timedata1[2].values[i][1] }],
        //                 datakeski: [...this.state.datakeski, { name: this.state.timedata1[0].values[i][0], pv: (Number(this.state.timedata1[0].values[i][1]) + 1 + Number(this.state.timedata1[2].values[i][1])) / 3 }]
        //             })
        //         }
        //         else if (this.state.timedata1[2].values[i][1] > 10) {
        //             this.setState({
        //                 data: [...this.state.data, { name: this.state.timedata1[0].values[i][0], pv: this.state.timedata1[0].values[i][1], uv: this.state.timedata1[1].values[i][1], dv: '1' }],
        //                 datakeski: [...this.state.datakeski, { name: this.state.timedata1[0].values[i][0], pv: (Number(this.state.timedata1[0].values[i][1]) + Number(this.state.timedata1[1].values[i][1]) + 1) / 3 }]
        //             })
        //         }
        //         else {
        //             this.setState({
        //                 data: [...this.state.data, { name: this.state.timedata1[0].values[i][0], pv: this.state.timedata1[0].values[i][1], uv: this.state.timedata1[1].values[i][1], dv: this.state.timedata1[2].values[i][1] }],
        //                 datakeski: [...this.state.datakeski, { name: this.state.timedata1[0].values[i][0], pv: (Number(this.state.timedata1[0].values[i][1]) + Number(this.state.timedata1[1].values[i][1]) + Number(this.state.timedata1[2].values[i][1])) / 3.00 }]
        //             })
        //         }
        //         console.log(this.state.datakeski)

        //     }
        // }

        // if (this.state.data !== this.state.data2)
        //     this.setState({
        //         data2: this.state.data,
        //         data: [],
        //     })
        
        // if (this.state.timemin !== this.state.timemin2)
        //     this.setState({
        //         timemin2: this.state.timemin,
        //         timemin: [],
        //     })
        // if (this.state.datakeski !== this.state.datakeski2)
        //     this.setState({
        //         datakeski2: this.state.datakeski,
        //         datakeski: [],
        //     })

        // if (this.state.data2.length > 1) {
        //     clearInterval(this.timerID);
        // }

        //clearInterval(this.timerID);
    };

    async axiosurl() {
        // await axios.get(this.state.aurl)
        //     .then(res => {
        //         const resdata = res.data;
        //         this.setState({
        //             timedata1: resdata.results[0].series,
        //         })
        //     })

        await axios.get(this.state.timeurlmac1)
            .then(res => {
                const resdata = res.data;
                this.setState({
                    timedata1: resdata,
                })
                // console.log(resdata)
            })
        await axios.get(this.state.timeurlmac2)
            .then(res => {
                const resdata = res.data;
                this.setState({
                    timedata2: resdata,
                })
                // console.log(resdata)
            })
        await axios.get(this.state.timeurlmac3)
            .then(res => {
                const resdata = res.data;
                this.setState({
                    timedata3: resdata,
                })
                // console.log(resdata)
            })
    }
   
    render() {
        return (
            <div>
                <TimeChart data={this.state.chartdata} />
                    <br />Keskiarvo<br />
                <TimeChart data={this.state.chartkeski} />  
            </div>
        )
    }
}

export default MoveTime
