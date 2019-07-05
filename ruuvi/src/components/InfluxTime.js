import React, { Component } from 'react'
import axios from 'axios'
import { XAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, YAxis } from 'recharts';
//import LiikeTime from './LiikeTime';

class InfluxTime extends Component {

    constructor(props) {
        super(props)
        this.state = {
            liiketime1: [],
            liiketime2: [],
            liiketime3: [],
            liikedata: [],
            vanhaliikex: [],
            vanhaliikey: [],
            vanhaliikez: [],
            uusiliike: [],
            muutosx: [],
            muutosy: [],
            muutosz: [],
            arvo: 0.03,
            liikkunut1: '',
            liikkunut2: '',
            liikkunut3: '',
            plus1: 1
        };
      }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //const data = [{name: 'Page A', uv: 400, pv: 2200, amt: 2200}, {}]

    influxtimedata() {
        axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationX),%20mean(accelerationY),%20mean(accelerationZ)%20FROM%20ruuvi_measurements%20WHERE%20TIME%20%3E=%20now()%20-%201h%20GROUP%20BY%20time(10s),%20mac%20fill(0)%20ORDER%20BY%20DESC`)
            .then(res => {
                const timedata = res.data;
            this.setState({
                liiketime1: [timedata.results[0].series[0]],
                liiketime2: [timedata.results[0].series[1]],
                liiketime3: [timedata.results[0].series[2]],
                liikedata: [...this.state.liikedata, {name: timedata.results[0].series[0].values[0][0], uv: timedata.results[0].series[0].values[0][1]}],
                liikkunut1: '',
                liikkunut2: '',
                liikkunut3: '',
            })
        })
        if ((this.state.liiketime1.length > 0) && (this.state.liiketime1))
        {

/*             this.setState({
                vanhaliikex: [...this.state.vanhaliikex, `${this.state.liiketime1[0].values[0][1]}`],
                vanhaliikey: [...this.state.vanhaliikey, `${this.state.liiketime2[0].values[0][2]}`],
                vanhaliikez: [...this.state.vanhaliikez, `${this.state.liiketime3[0].values[0][3]}`],
            })    */         
            
            for (var i = 1; i < `${this.state.liiketime1[0].values.length}`; i++) {
                //console.log(`${this.state.liiketime1[0].values[i][0]}`)
               // alert(i)

            if ((Math.abs(Number(this.state.liiketime1[0].values[i][1] - Number(this.state.liiketime1[0].values[i-1][1]))) > this.state.arvo) 
            && (Math.abs(Number(this.state.liiketime1[0].values[i][2] - Number (this.state.liiketime1[0].values[i-1][2]))) > this.state.arvo)
            && (Math.abs(Number(this.state.liiketime1[0].values[i][3] - Number(this.state.liiketime1[0].values[i-1][3]))))) {
                //console.log(i + ": Arvo yli 0.03")
                this.setState((PrevState) => ({
                    liikkunut1: (Number(PrevState.liikkunut1) + Number(this.state.plus1))
                })
                )
            }


                // this.setState({
                //     muutos1x: [...this.state.muutosx, Math.abs(Number(this.state.liiketime1[0].values[i][1] - Number(this.state.liiketime1[0].values[i-1][1])))],
                //     muutos1y: [...this.state.muutosx, Math.abs(Number(this.state.liiketime1[0].values[i][1] - Number(this.state.liiketime1[0].values[i-1][1])))],
                //     muutos1z: [...this.state.muutosx, Math.abs(Number(this.state.liiketime1[0].values[i][1] - Number(this.state.liiketime1[0].values[i-1][1])))],
                // })

                //console.log(this.state.liiketime1[0].values)
                //console.log("Time : "+ this.state.liiketime1[0].values[i][0] + " | X: " + this.state.liiketime1[0].values[i][1] + " | Y: " + this.state.liiketime1[0].values[i][2] + " | Z: " + this.state.liiketime1[0].values[i][3])
             // if (!this.state.muutosx[i]) {  
                // this.setState({
                //     muutosx: [...this.state.muutosx, Math.abs(Number(this.state.liiketime1[0].values[i][1]) - Number(this.state.vanhaliikex[i-1]))]
                // })
            // }

/*                 this.setState({
                    vanhaliikex: [...this.state.vanhaliikex, `${this.state.liiketime1[0].values[i][1]}`],
                    vanhaliikey: [...this.state.vanhaliikey, `${this.state.liiketime2[0].values[i][2]}`],
                    vanhaliikez: [...this.state.vanhaliikez, `${this.state.liiketime3[0].values[i][3]}`],
                }) */
            }
            //console.log(`${this.state.vanhaliikex}`)
           // console.log(`${this.state.muutos1x}`)
           //this.state.liiketime1.map((i, index) => <div key={index}>{values[i][1]}</div>)
            //console.log(this.state.liikedata)
            
            //console.log(this.state.liiketime1[0].values[1])
            }

            
    }

    tick = () => {
        this.influxtimedata()


        if ((this.state.liiketime2.length > 0) && (this.state.liiketime2))
        {

            for (var i = 1; i < `${this.state.liiketime2[0].values.length}`; i++) {
                //console.log(`${this.state.liiketime1[0].values[i][0]}`)
               // alert(i)

            if ((Math.abs(Number(this.state.liiketime2[0].values[i][1] - Number(this.state.liiketime2[0].values[i-1][1]))) > this.state.arvo) 
            && (Math.abs(Number(this.state.liiketime2[0].values[i][2] - Number (this.state.liiketime2[0].values[i-1][2]))) > this.state.arvo)
            && (Math.abs(Number(this.state.liiketime2[0].values[i][3] - Number(this.state.liiketime2[0].values[i-1][3]))))) {
                //console.log(i + ": Arvo yli 0.03")
                this.setState((PrevState) => ({
                    liikkunut2: (Number(PrevState.liikkunut2) + Number(this.state.plus1))
                })
                )
            }

        }
        }

        if ((this.state.liiketime3.length > 0) && (this.state.liiketime3))
        {

            for (var y = 1; y < `${this.state.liiketime3[0].values.length}`; y++) {
                //console.log(`${this.state.liiketime1[0].values[i][0]}`)
               // alert(i)

            if ((Math.abs(Number(this.state.liiketime3[0].values[y][1] - Number(this.state.liiketime3[0].values[y-1][1]))) > this.state.arvo) 
            && (Math.abs(Number(this.state.liiketime3[0].values[y][2] - Number (this.state.liiketime3[0].values[y-1][2]))) > this.state.arvo)
            && (Math.abs(Number(this.state.liiketime3[0].values[y][3] - Number(this.state.liiketime3[0].values[y-1][3]))))) {
                //console.log(i + ": Arvo yli 0.03")
                this.setState((PrevState) => ({
                    liikkunut3: (Number(PrevState.liikkunut3) + Number(this.state.plus1))
                })
                )
            }

        }
        }
        
        // for (var i = 1; i < this.state.muutos1x.length; i++) {

        //     if ((this.state.muutos1x > this.state.arvo) && (this.state.muutos1y > this.state.arvo) && (this.state.muutos1z)) {
        //         console.log(i + ": Arvo yli 0.03")
        //     }
        // }


    //    if ((this.state.liiketime1.length > 0) && (this.state.liiketime1)) {

    //     for (var i = 0; i > `${this.state.liiketime1[0].values}`; i++) {
    //         console.log("meh")
    //         alert(i)
    //     }

    //     `${this.state.liiketime1[0].values}`.forEach(item => console.log(item))


    // }

    

    console.log("1 Liikkunut: " + this.state.liikkunut1)
    console.log("2 Liikkunut: " + this.state.liikkunut2)
    console.log("3 Liikkunut: " + this.state.liikkunut3)


    }

    liikedata() {

        if ((this.state.liiketime1.length > 0) && (this.state.liiketime1))
        {
            return (
                
                // this.state.liiketime1[0].values[1],
//                this.state.liiketime1[0].values[1][1],

                this.state.liiketime1[0].values[1].map((i, index) => 
                <div key={index}>{i}</div>)
            )
        }
        else 
            return '123'
        
        
    }

    render() {

        return (
            <div>
                <br />
                test
                {/* {this.liikedata()} */}
            <BarChart width={730} height={250} data={this.state.liikedata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        
            </div>
        )
    }
}

//const data = [{name: 'Page A', uv: 20},{name: 'Page B', uv: 25 },{name: 'Page C', uv: 22 },{name: 'Page D', uv: 28 },{name: 'Page E', uv: 19 }];

//const data = [{name: 'Page A', uv: 400, pv: 2200, amt: 2200},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2500, amt: 2600},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2700, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2700, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 200},];


export default InfluxTime
