import { h, Component } from 'preact';
import { route } from 'preact-router';
var popupTools = require('popup-tools');

export default class Home extends Component {
  static defaultProps = {
  }

  state = {
    googleURL: ''
  }

  componentWillMount() {
    this.request({
      method: 'GET', 
      url: '/auth/google/url',
      success: (url) => {
        this.setState({googleURL: url})
      }
    });
  }

  componentDidMount() {
    // console.log('mounted');
  }

  request(arg) {
    let req = new XMLHttpRequest();
    req.open(arg.method, arg.url, true);
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
  
  onSignIn(googleUser) {
  }

  onFailureSingIn(reason) {
    console.error('failed signin');
  }

  singin() {
    popupTools.popup(this.state.googleURL, 'google auth', {}, (err, resp) => {
      if (err) {console.error(err);}
      console.log(resp);
    })
  }

  render() {
    return(
      <div>
        <span>HOME</span>
        <button type="" onClick={() => this.singin()}> google </button>
      </div>
    )
  }
}