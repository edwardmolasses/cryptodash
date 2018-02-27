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

    render() {
        let chartConfigSettings = {
                title: {
                    text: this.props.chartTitle
                },
                series: [{
                    data: this.props.chartSeries
                }],
                xAxis: {
                    type: 'datetime',
                    labels: {
                        formatter: this.props.chartFormatter
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
        return (
            <ReactHighcharts config={chartConfigSettings}></ReactHighcharts>
        );
    }
}

export default Chart;
