import React from 'react';
import Highcharts from 'highcharts';

class Chart extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        id: props.id,
        type: props.type || "column",
        data: props.data
      }
    }

    componentDidMount() {
      this.chart = Highcharts.chart(this.state.id, {
          chart: {
              type: this.state.type
          },
          title: {
              text: this.props.title,
              x: -20 //center
          },
          xAxis: {
              title: {
                  text: 'Days'
              },
              categories: [1, 2, 3, 4, 5, 6, 7]
          },
          yAxis: {
              title: {
                  text: '1/m2'
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          tooltip: {
              valueSuffix: '°C'
          },
          legend: {
              enabled: false
          },
          series: this.state.data
       });

    }

    componentWillReceiveProps(props) {
      const max = props.data.length;
      let i;

      while(this.chart.series.length > 0) {
        this.chart.series[0].remove(true);
      }

      for ( i = 0; i < max; i += 1 ) {
        this.chart.addSeries(props.data[i]);
      }

      this.chart.redraw();
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return <div id={this.state.id} data={this.state.data} type={this.props.type} title={this.props.title} >
          Chart
        </div>;
    }
}

export default Chart;
