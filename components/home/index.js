import { h, Component } from 'preact';
import { route } from 'preact-router';
import { css } from 'glamor';

import Auth from './auth';

export default class Home extends Component {
  render() {
    return(
      <div {...containerStyle} >
        <div {...headerStyle}>rockfall</div>
        <div {...subHeaderStyle} >0.0.1</div>
        <Auth />
      </div>
    )
  }
}

// /////////
// Styles //
// /////////
const containerStyle = css({
  // height: '90%',
  width: '90%',
  minHeight: '300px',
  minWidth: '300px',

  margin: '10px',
  padding: '20px',
  
  color: 'white',

  MozBoxShadow: '0 0 20px #000000',
  WebkitBoxShadow: '0 0 20px #000000',
  boxShadow: '0 0 20px #000000',
  background: 'radial-gradient(circle farthest-side, #3B536A 0%, #12191F 100%)'
});

const headerStyle = css({
  margin: '10px auto',

  width: 100,
  cursor: 'pointer',

  fontSize: '1.3em',
  textTransform: 'uppercase',

  transition: '.5s',

  ':hover': {
    color: '#F04903'
  }
});

const subHeaderStyle = css({
  width: 50,
  margin: 'auto'
});