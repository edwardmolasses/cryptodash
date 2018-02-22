import React, { Component } from 'react';
import './assets/App.css';
import ReactHighcharts from 'react-highcharts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartConfig: {}
        };
    }

    componentDidMount(newProps) {
    }

    componentWillReceiveProps(newProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isConfigSet = !!this.props.chartTitle;
        let isNextPropsSet = !!nextProps.chartTitle;
        let isChartConfigDiff = isConfigSet && nextProps.chartTitle !== this.props.chartTitle;
        let shouldUpdate = (!isConfigSet && isNextPropsSet) || isChartConfigDiff;

        return !isConfigSet || shouldUpdate;
    }

    getConfigSettings(title, formatter) {
        return {
            title: {
                text: title
            },

            xAxis: {
                type: 'datetime',
                labels: {
                    formatter: formatter
                }
            },

            chart: {
                renderTo: 'container',
                type: 'area'
            },

            legend: {
                enabled: false
            },

            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            }
        };
    }

    render() {
        let chartConfigSettings = Object.assign(
            this.props.chartConfig,
            this.getConfigSettings(this.props.chartTitle, this.props.chartFormatter)
        );
        return (
            <ReactHighcharts config={chartConfigSettings}></ReactHighcharts>
        );
    }
}

export default Chart;
