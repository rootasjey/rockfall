// //////////////////////
// ContainerComponents.js
// //////////////////////
import React, { PropTypes } from 'react';

// Material-UI Components
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// Redux
import { connect } from 'react-redux';
import { openContainerComponentsUI, closeContainerComponentsUI } from '../actions/ContainerComponentsActions';

// Custom components
import MessagesCenter from '../components/MessagesCenter';
import Leadderboard from '../components/Leadderboard';
import Settings from '../components/Settings';
import Play from '../components/Play';

var Logo = require('../assets/icons/rockfall_logo.svg');

class ContainerComponents extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenUI = this.handleOpenUI.bind(this);
    this.handleCloseUI = this.handleCloseUI.bind(this);

    for (var i = 0, l = this.props.bubblesN; i < l; i++) {
      this.props.bubbles.push(i);
    }
  }

  PropTypes: { // Types Definitions
    viewOpened: PropTypes.bool.isRequired,
    handleOpenUI: PropTypes.func.isRequired,
    bubbles: PropTypes.array,
    bubblesN: PropTypes.number
  }

  /**
   * Default properties
   */
  static defaultProps = {
    viewOpened: false,
    bubblesN: 10,
    bubbles: [],

    /**
     * Component's styles definition
     */
    styles: {
      container: {
        position: 'relative',
        margin: 'auto',
        zIndex: '1'
      },

      containerOFF: {
        top: '25%',

        height: 200,
        width: 150,

        textAlign: 'center',

        background: 'transparent'
      },

      containerON: {
        top: '10%',

        height: '70%',
        width: '70%',

        textAlign: 'left',

        background: '#34495e'
        // background: 'radial-gradient(circle farthest-side, #3B536A 0%, #12191F 100%)'
      },
      buttonPlay: {
        marginTop: 20
      },

      homeView: {
        display: 'block'
      },

      title: {
        fontSize: '2em'
      },

      logo: {
        display: 'block',

        margin: 'auto',
        marginTop: 20,
        marginBottom: 20,

        height: 50,
        width: 50
      },

      buttonClose: {
        color: 'white',
        cursor: 'pointer',

        top: 10,
        right: 10,
        position: 'absolute',
      },
      buttonCloseOFF: {
        display: 'none'
      },
      buttonCloseON: {
        display: 'inline-block'
      },

      abstractBackground: {
        height: '100%',
        width: '100%',
        position: 'absolute',

        backgroundColor: '#ecf0f1',

        zIndex: '2'
      },

      background: {
        zIndex: '-1'
      },
      backgroundOFF: {
        display: 'none'
      },
      backgroundON: {
        display: 'inline-block'
      }
    },
  }

  /**
   * Styles Functions
   */
   getContainerStyle() {
     if (this.props.viewOpened) {
       return Object.assign( {},
         this.props.styles.container,
         this.props.styles.containerON
       )
     }
     return Object.assign( {},
       this.props.styles.container,
       this.props.styles.containerOFF
     )
   }

   getContainerDepth() {
     if (this.props.viewOpened) {
       return 2;
     }
     return 0;
   }

   getButtonPlayStyle() {
     if (this.props.viewOpened) {
       return {
         ...this.props.styles.buttonPlay,
         display: 'none'
       }
     }
     return this.props.styles.buttonPlay;
   }

   getHomeViewStyle() {
     if (this.props.viewOpened) {
       return {
         ...this.props.styles.homeView,
         display: 'none'
       }
     }
     return this.props.styles.homeView;
   }

   getButtonCloseStyle() {
     if (this.props.viewOpened) {
       return Object.assign( {},
         this.props.styles.buttonClose,
         this.props.styles.buttonCloseON
       )
     }

     return Object.assign( {},
       this.props.styles.buttonClose,
       this.props.styles.buttonCloseOFF
     );
   }

   // Set an animated class depending on the container's view state
   getBackgroundClass() {
     if (this.props.viewOpened) {
       return ''
     } else {
       return 'bg-bubbles'
     }
   }

   getBackgroundStyle() {
     if (this.props.viewOpened) {
       return Object.assign( {},
         this.props.styles.background,
         this.props.styles.backgroundOFF
       )
     }

     return Object.assign( {},
       this.props.styles.background,
       this.props.styles.backgroundON
     )
   }

  /**
   * Fired when the message button is clicked
   * @param {object} event
   */
  handleOpenUI(e) {
    this.props.dispatch(openContainerComponentsUI());
  }

  handleCloseUI(e) {
    this.props.dispatch(closeContainerComponentsUI());
  }

  render() {
    return (
      <div style={ this.props.styles.abstractBackground }>
        <div style={ this.getBackgroundStyle() }>
          <ul className={ this.getBackgroundClass() }>
            { this.props.bubbles.map((key) => <li key={key}></li>) }
          </ul>
        </div>

        <Paper style={ this.getContainerStyle() } zDepth={ this.getContainerDepth() }>
          <div style={ this.getHomeViewStyle() }>
            <div style={ this.props.styles.title }>Rockfall</div>
            <Logo style={ this.props.styles.logo } />
          </div>

          {/* Close Button */}
          <FloatingActionButton style={ this.getButtonCloseStyle() }
            onClick={ this.handleCloseUI }>
            <FontIcon className="material-icons">close</FontIcon>
          </FloatingActionButton>

          {/* Button displayed when the view is closed */}
          <RaisedButton label="play" style={ this.getButtonPlayStyle() }
            labelColor='white' backgroundColor='#e74c3c'
            onClick={ this.handleOpenUI }/>

            {/* Play Component */}
            <Play />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { views } = state;

  return {
    'viewOpened': views.main
  };
}

export default connect(mapStateToProps)(ContainerComponents);
