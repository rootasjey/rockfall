import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { css } from 'glamor';

import Home from './home';

const fontTTF   = require('file-loader!./fonts/exo-thinitalic-webfont.ttf');
const fontWOFF  = require('file-loader!./fonts/exo-thinitalic-webfont.woff');
const fontEOT   = require('file-loader!./fonts/exo-thinitalic-webfont.eot');
const fontSVG   = require('file-loader!./fonts/exo-thinitalic-webfont.svg');

export default class App extends Component {
  static defaultProps = {
    isConnected: false
  }

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div class='app' {...css(appStyle, {fontFamily: family})} >
          <Router onChange={this.handleRoute}>
            <Home path='/'/>
          </Router>
      </div>
    )
  }
}

// /////////
// Styles //
// /////////
const appStyle = css({
  height: '100%',
  width: '100%'
});

const family = css.fontFace({
  fontFamily: 'exothinitalic',
  fontStyle: 'normal',
  fontWeight: 400,
  src: "local('exothinitalic'), " +
        `url('${fontEOT}'),` + 
        `url('${fontWOFF}') format('woff'),` + 
        `url('${fontTTF}') format('truetype')`
});