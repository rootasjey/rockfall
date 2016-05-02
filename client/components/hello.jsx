var React = require('react');

var Hello = React.createClass({
    render: function () {
        return (
            <p>
            <h1>Hello World!</h1>!
            It is {this.props.date.toTimeStrin()}
            </p>
        );
    }
});

module.exports = Hello;
