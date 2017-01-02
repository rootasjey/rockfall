import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Home extends Component {
  static defaultProps = {
    styles: {
      container: {
      }
    }
  }

  componentWillMount() {
    
  }

  render() {
    return(
      <div style={this.props.styles.container}>
        <span>HOME</span>
      </div>
    )
  }
}
