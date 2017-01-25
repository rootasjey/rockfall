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

  componentWillMount() {
    this.request({
      url: '/auth/google/url',
      success: (url) => {
        this.setState({...this.state, urls: {...this.state.urls, google: url}})
      }
    })

    this.request({
      url: '/auth/facebook/url',
      success: (url) => {
        this.setState({...this.state, urls: {...this.state.urls, facebook: url}})
      }
    })

    this.request({
      url: '/auth/twitter/url',
      success: (url) => {
        this.setState({...this.state, urls: {...this.state.urls, twitter: url}})
      }
    })

    this.request({
      url: 'auth/microsoft/url',
      success: (url) => {
        this.setState({...this.state, urls: {...this.state.urls, microsoft: url}})
      }
    })
  }

  signinGoogle() {
    popupTools.popup(this.state.urls.google, 'google auth', {}, (err, resp) => {
      if (err) { console.error(err) }
      console.log(resp)
      this.setState({user: resp})
    })
  }

  signinFacebook() {
    popupTools.popup(this.state.urls.facebook, 'facebook auth', {}, (err, resp) => {
      if (err) { console.error(err) }
      console.log(resp)
      this.setState({user: resp})
    })
  }

  signinTwitter() {
    popupTools.popup(this.state.urls.twitter, 'twitter auth', {}, (err, resp) => {
      if (err) { console.error(err) }
      console.log(resp)
      this.setState({user: resp})
    })
  }

  signinMicrosoft() {
    popupTools.popup(this.state.urls.microsoft, 'microsoft auth', {}, (err, resp) => {
      if (err) { console.error(err) }
      console.log(resp)
      this.setState({user: resp})
    })
  }

  render() {
    return (
      <div {...containerStyle} >
        <div {...textStyle} >
          Keep your progression by singin with...
        </div>

        <div {...bubble} onClick={() => this.signinGoogle()} >
          <img src={googleIcon} alt="google icon"/>
        </div>

        <div {...bubble} onClick={() => this.signinFacebook()} >
          <img src={facebookIcon} alt="facebook icon" />
        </div>

        <div {...bubble} onClick={() => this.signinTwitter()} >
          <img src={twitterIcon} alt="twitter icon"/>
        </div>

        <div {...bubble} onClick={() => this.signinMicrosoft()} >
          <img src={microsoftIcon} alt="microsoft icon"/>
        </div>

        <div {...textStyle} >
          ...Or stay anonymous
        </div>

        <div {...css(button, playButton)} >
          play
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

  textAlign: 'center'
})

const textStyle = css({
  margin: '40px'
})

const playButton = css({
  background: '#F04903'
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