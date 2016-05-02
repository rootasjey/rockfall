var React = require('react');

var Hello = React.createClass({
    render: function () {
        return (
            <p>
            <span>Hello World!</span>!
            <span>This is a test</span>
            It is {this.props.date.toLocaleString('en-US')}
            </p>
        );
    }
});

module.exports = Hello;
