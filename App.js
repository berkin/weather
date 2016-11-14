import React from 'react';
import Chart from './components/Chart';
import Range from './components/Range'

class App extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        temperature: 15,
        pressure: 1010,
        chanceOfRain: []
      }
    }

    chanceOfRain(pressure, temperature, amount) {
      const score = Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);
      const mean = Math.min(Math.max(score, 0), 100);
      const upper_bound = Math.min(1.5 * mean, 100);
      const lower_bound = Math.max(0.5 * mean, 0);

      return [lower_bound, mean, upper_bound];
    }

    componentDidMount() {
      fetch('http://private-4945e-weather34.apiary-proxy.com/weather34/rain', {
        method: 'GET'
      }).then((response) => {
         if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' + response.status);  
          return;  
        }

        response.json().then((data) => { 
          const chances = data[0].days.map((value) => this.chanceOfRain(this.state.pressure, this.state.temperature, value.amount));

          this.setState({
            amountOfRainfall: [{ data: data[0].days.map((value) => value.amount) }],
            chanceOfRain: [{
              name: "Lower Bound",
              data: chances.map((items) => items[0])
            },
            {
              name: "Mean",
              data: chances.map((items) => items[1])
            },{
              name: "Upper Bound",
              data: chances.map((items) => items[2])
            }]
          });

        });

      });
    }

    updateTemperature(temperature) {
      this.setState({
        temperature: temperature
      });
    }

    updatePressure(pressure) {
      this.setState({
        pressure: pressure
      })
    }

    render() {
        return <div>
          <Range id="pressure" value={this.state.pressure} min="970" max="1030" update={this.updatePressure.bind(this)} />
          <Chart id="chanceOfRain" type="area" data={this.state.chanceOfRain} title="Chance of Rain" />
  
          <Range id="temperature" value={this.state.temperature} min="10" max="35" update={this.updateTemperature.bind(this)} />
          <Chart id="amountOfRainfall" type="column" data={this.state.amountOfRainfall} title="Amount of Rainfall" />
        </div>;
    }
}

export default App;
