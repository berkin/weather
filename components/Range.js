import React from 'react';

class Range extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
        value: props.value,
        min: props.min,
        max: props.max
      };
    } 

    update(e) {
       this.setState({value: e.target.value});
       this.props.update(e.target.valuee);
    }

    render() {
        return <div>
           <input id={this.props.id} type="range" step="1" min={this.props.min} max={this.props.max} value={this.state.value} onChange={this.update.bind(this)} />
           <div>{this.state.value}</div>
        </div>;
    }
}

export default Range;
