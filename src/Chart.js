import React, { Component } from 'react';
import './assets/App.css';
import ReactHighcharts from 'react-highcharts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        //let isConfigSet = !!this.props.chartConfig.title;
        //let isNextPropsSet = !!nextProps.chartConfig.title;
        //let isChartConfigDiff = isConfigSet && nextProps.chartConfig.title.text !== this.props.chartConfig.title.text;
        //let shouldUpdate = (!isConfigSet && isNextPropsSet) || isChartConfigDiff;
        //
        //return !isConfigSet || shouldUpdate;
        return true;
    }

    render() {
        return (
            <ReactHighcharts config={this.props.chartConfig}></ReactHighcharts>
        );
    }
}

export default Chart;
