import React from 'react';
import intent from '../utils/intent';

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
      const target = e.target.value
       this.setState({value: target});
       intent(() => {
          this.props.update(target);
       });
    }

    render() {
        return <div>
           <input id={this.props.id} type="range" step="1" min={this.props.min} max={this.props.max} value={this.state.value} onChange={this.update.bind(this)} />
           <div>{this.state.value}</div>
        </div>;
    }
}

export default Range;
