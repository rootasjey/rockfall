import { h, Component } from 'preact';
import { route } from 'preact-router';
import { css } from 'glamor';

var popupTools = require('popup-tools');

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
        this.setState({urls: {google: url}})
      }
    });

    this.request({
      url: '/auth/facebook/url',
      success: (url) => {
        this.setState({urls: {facebook: url}})
      }
    });

    this.request({
      url: '/auth/twitter/url',
      success: (url) => {
        this.setState({urls: {twitter: url}})
      }
    });
  }

  singinGoogle() {
    popupTools.popup(this.state.urls.google, 'google auth', {}, (err, resp) => {
      if (err) { console.error(err) }
      console.log(resp);
      this.setState({user: resp});
    });
  }

  singinFacebook() {
    popupTools.popup(this.state.urls.facebook, 'facebook auth', {}, (err, resp) => {
      if (err) { console.error(err) }
      console.log(resp);
      this.setState({user: resp});
    });
  }

  singinTwitter() {
     popupTools.popup(this.state.urls.twitter, 'facebook auth', {}, (err, resp) => {
      if (err) { console.error(err) }
      console.log(resp);
      this.setState({user: resp});
    });
  }

  render() {
    return (
      <div {...containerStyle} >
        <div>
          Keep your progression by singin with...
        </div>

        <div {...buttonAuth} onClick={() => this.singinGoogle()} >
          google
        </div>

        <div {...buttonAuth} onClick={() => this.singinFacebook()} >
          facebook
        </div>

        <div {...buttonAuth} onClick={() => this.singinTwitter()} >
          twitter
        </div>

        <div {...buttonAuth} >
          microsoft
        </div>

        <div {...anonymousStyle} >
          ...Or stay anonymous
        </div>

        <div {...css(buttonAuth, playButton)} >
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
  margin: 'auto',
  marginTop: '100px',

  textAlign: 'center'
});

const anonymousStyle = css({
  margin: '20px'
});

const playButton = css({
  background: '#F04903'
});

const buttonAuth = css({
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
});