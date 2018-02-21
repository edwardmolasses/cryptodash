import React, { Component } from 'react';
import * as DATA from './Data';
import moment from 'moment';
import Chart from './Chart';

class Github extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {}
        };

        this.getConfig = this.getConfig.bind(this);
    }

    async componentDidMount() {
        //const cachedCoin = DATA.getCached(this.props.chartCoin);
        //const coinData = cachedCoin ? cachedCoin : await this.callBranchContributors(this.props);
        const coinData = await this.callBranchContributors(this.props);

        this.setState({config: this.getConfig(DATA.coinRepoKeys[this.props.chartCoin].name, coinData)});
    }

    async componentWillReceiveProps(newProps) {
        if (this.props.chartCoin !== newProps.chartCoin) {
            //const cachedCoin = DATA.getCached(newProps.chartCoin);
            //const coinData = cachedCoin ? cachedCoin : await this.callBranchContributors(newProps);
            const coinData = await this.callBranchContributors(newProps);

            this.setState({config: this.getConfig(DATA.coinRepoKeys[newProps.chartCoin].name, coinData)});
        }
    }

    callBranchContributors(newProps) {
        //let githubObj = await DATA.getBranchContributors(DATA.coinRepoKeys[newProps.chartCoin].owner, DATA.coinRepoKeys[newProps.chartCoin].repo);
        let githubObj = DATA.callApi(
            'github',
            'contributors',
            DATA.coinRepoKeys[newProps.chartCoin].owner,
            DATA.coinRepoKeys[newProps.chartCoin].repo
        );

        //let githubJson = await githubObj.json();
        let series = [];
        let commitsMap = githubObj
            .map(value => value.weeks)
            .reduce((sum, value) => sum.concat(value))
            .reduce((sum, value) => {
                sum[value.w] = !!sum[value.w] ? value.c + sum[value.w] : value.c;
                return sum;
            });

        Object.entries(commitsMap).forEach(function (value) {
            let timestamp = parseInt(value[0], 10);
            let commits = value[1];

            if (Number.isInteger(timestamp)) {
                series.push([timestamp, commits]);
            }
        });
        //DATA.setCached(newProps.chartCoin, series);

        return series;
    }

    getConfig(title, series) {
        return {
            chart: {
                renderTo: 'container2',
                type: 'area'
            },

            title: {
                text: title
            },

            legend: {
                enabled: false
            },

            xAxis: {
                type: 'datetime',
                labels: {
                    formatter: function () {
                        return moment(this.value).format("M/D");
                    }
                }
            },

            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },

            series: [{
                data: series
            }]
        };
    }

    render() {
        return (
            <div>
                <Chart chartConfig={this.state.config}/>
            </div>
        );
    }
}

export default Github;
