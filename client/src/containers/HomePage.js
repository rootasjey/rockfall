import React, { PropTypes } from 'react';
import ContainerComponents from './ContainerComponents';
var Logo = require('../assets/icons/rockfall_logo.svg');

export default class HomePage extends React.Component {
  /**
   * Default properties
   */
  static defaultProps = {
    /**
     * Component's styles definition
     */
     styles: {
       page: {
         height: '100%',
         width: '100%',

        //  backgroundColor: 'blue',
       },
       centerBlock: {
         top: '25%',
         margin: 'auto',
         position: 'relative',

         textAlign: 'center',

         width: 150
       },
       title: {
         fontSize: '2em'
       },
       logo: {
         margin: 'auto',
         marginTop: 20
       }
     }
  }

  render () {
    return (
      <div style={this.props.styles.page}>
        <div style={this.props.styles.centerBlock}>
          <div style={this.props.styles.title}>Rockfall</div>
          <Logo style={this.props.styles.logo} />
        </div>
      </div>
    )
  }
}
