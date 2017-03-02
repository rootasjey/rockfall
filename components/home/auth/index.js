import { h, Component } from 'preact'
import { route } from 'preact-router'
import { css } from 'glamor'

var popupTools = require('popup-tools')

const facebookIcon  = require('file-loader!./icons/facebook.png')
const googleIcon    = require('file-loader!./icons/gplus.png')
const twitterIcon   = require('file-loader!./icons/twitter.png')
const microsoftIcon = require('file-loader!./icons/microsoft.png')

export default class Auth extends Component {
  state = {
    urls: {
      google: '',
      facebook: '',
      microsoft: '',
      twitter: '',
    },
    user: {}
  }

  bubbles = {}

  request(arg) {
    let req = new XMLHttpRequest();
    req.open(arg.method || 'GET', arg.url, true);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 200) {
          arg.success(req.response, req);
          return;
        }

        console.error('The request failed');
        arg.failure(req.response, req);
      }
    }.bind(this);
    req.send(JSON.stringify(arg.data));
  }

  componentDidMount() {
    ['google', 'facebook', 'twitter', 'microsoft']
    .map((service) => {
      this.request({
        url: `/auth/${service}/url`,
        success: (url) => {
          let urls = {...this.state.urls}
          urls[service] = url
          this.setState({...this.state, urls})
        }
      })
    })
  }

  signin(service) {
    if (this.state.user.service) {
      console.log('already connected');
      return;
    }

    popupTools.popup(this.state.urls[service], `${service} auth`, {}, (err, resp) => {
      if (err) { console.error(err) }

      let user = {...resp.user, service: service}
      this.setState({user: user})
      console.log(this.state.user)
    })
  }

  bubbleStyle(service) {
    // return default style if the user not connected
    if (!this.state.user.service) {
      return bubble
    }

    if (this.state.user.service == service) {
      return bubble
    }

    return css(bubble, {display: 'none'})
  }

  infosStyle() {
    if (!this.state.user.service) {
      return css({display: 'none'})
    }

    return css({
      display: 'block'
    })
  }

  helpStyle(componentStyle) {
    return this.state.user.service ? 
      css(componentStyle, {display: 'none'}) : componentStyle;
  }

  connectedStyle(componentStyle) {
    return this.state.user.service ? 
      componentStyle : css(componentStyle, {display: 'none'});
  }

  open() {

  }
  
  close() {

  }

  render() {
    return (
      <div {...containerStyle} >
        <div {...this.connectedStyle(closeButton)} onClick={() => this.close()} ></div>

        <div {...this.helpStyle(textStyle)} >
          Keep your progression by singin with...
        </div>

        <div {...this.bubbleStyle('google')} 
            onClick={() => this.signin('google')} data-service='google'
            ref={(googleBubble) => {this.bubbles.google = googleBubble}} >
          <img src={googleIcon} alt="google icon"/>
        </div>

        <div {...this.bubbleStyle('facebook')} 
            onClick={() => this.signin('facebook')} data-service='facebook' >
          <img src={facebookIcon} alt="facebook icon" />
        </div>

        <div {...this.bubbleStyle('twitter')} 
            onClick={() => this.signin('twitter')} data-service='twitter' >
          <img src={twitterIcon} alt="twitter icon"/>
        </div>

        <div {...this.bubbleStyle('microsoft')} 
            onClick={() => this.signin('microsoft')} data-service='microsoft' >
          <img src={microsoftIcon} alt="microsoft icon"/>
        </div>

        <div {...this.helpStyle(textStyle)} >
          ...Or stay anonymous
        </div>

        <div {...this.helpStyle(css(button, playButton))} >
          play
        </div>

        <div {...this.infosStyle()} >
          <div>Hello {this.state.user.username} </div>
          <div>score: {this.state.user.score} </div>
        </div>

      </div>
    );
  }
}

// /////////
// Styles //
// /////////
const containerStyle = css({
  width: '60%',
  margin: '70px auto',
  paddingTop: 70,

  textAlign: 'center',

  overflowY: 'hidden',

  position: 'relative'
})

const textStyle = css({
  margin: '40px'
})

const playButton = css({
  background: '#F04903'
})

const closeButton = css({
  position: 'absolute',
  right: '32px',
  top: '32px',
  width: '32px',
  height: '32px',
  cursor: 'pointer',
  opacity: '0.8',

  ':hover': {
    opacity: '1'
  },

  ':before': {
    transform: 'rotate(45deg)',
    position: 'absolute',
    left: '15px',
    content: '" "',
    height: '33px',
    width: '2px',
    backgroundColor: 'white',
  },
  ':after': {
    transform: 'rotate(-45deg)',
    position: 'absolute',
    left: '15px',
    content: '" "',
    height: '33px',
    width: '2px',
    backgroundColor: 'white'
  }
})

const bubble = css({
  color: 'white',

  height: 90,
  width: 90,

  lineHeight: '90px',

  cursor: 'pointer',

  padding: '10px',
  margin: '10px 5px',
  display: 'inline-block',

  borderRadius: 90,
  
  background: 'black',
  transition: '.5s',

  ':hover': {
    height: 100,
    width: 100,
    MozBoxShadow: '0 0 10px #000000',
    WebkitBoxShadow: '0 0 10px #000000',
    boxShadow: '0 0 10px #000000'
  },

  ' img': {
    height: 60,
    width: 60,
    marginTop: 15
  }
})

const button = css({
  color: 'white',

  height: '20px',

  cursor: 'pointer',

  padding: '10px 30px',
  margin: '10px 5px',
  display: 'inline-block',

  background: 'black',
  transition: '.5s',

  ':hover': {
    padding: '10px 40px',
    MozBoxShadow: '0 0 10px #000000',
    WebkitBoxShadow: '0 0 10px #000000',
    boxShadow: '0 0 10px #000000'
  }
})