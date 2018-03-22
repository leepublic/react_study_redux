import React from 'react';
import PropTypes from 'prop-types';

import Value from './Value';
import Control from './Control';
import { connect } from 'react-redux';
import * as actions from '../actions';

const propTypes = {

};

const defaultProps = {

};

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.setRandomColor = this.setRandomColor.bind(this);
    }

    setRandomColor() {
        const color = [
            Math.floor((Math.random()*55)+200),
            Math.floor((Math.random()*55)+200),
            Math.floor((Math.random()*55)+200)
        ];

        this.props.handleSetColor(color);
    }

    render() {

        const color = this.props.color;
        const style = {
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        };

        return (
            <div style={style}>
                <Value number={this.props.number}/>
                <Control
                    onPlus={this.props.handleIncrement}
                    onSubtract={this.props.handleDecrement}
                    onRandomizeColor={this.setRandomColor}
                />
            </div>
        );
    }
}

Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

// Redux store의 state를 Counter의 props로 mapping  하여 전달함.
const mapStateToProps = (state) => {
    return {
        number: state.counter.number,
        color: state.ui.color
    };
};

// action 을 counter의 props로 mapping하여 전달함.
const mapDispatchToProps = (dispatch) => {
    return {
        handleIncrement: () => { dispatch(actions.increment())},
        handleDecrement: () => {dispatch(actions.decrement())},
        handleSetColor: (color) => {dispatch(actions.setColor(color))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
