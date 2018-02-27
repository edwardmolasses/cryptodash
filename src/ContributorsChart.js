import React, { Component } from 'react';
import * as DATA from './Data';
import * as COMMON from './Common';
import moment from 'moment';
import Chart from './Chart';

class ContributorsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartTitle: '',
            series: {}
        };
        this.providerStr = 'github';
        this.opStr = 'contributors';
    }

    async componentDidMount() {
        await this.getBranchContributors(this.props);
    }

    async componentWillReceiveProps(newProps) {
        if (this.props.chartCoin !== newProps.chartCoin) {
            await this.getBranchContributors(newProps);
        }
    }

    async getBranchContributors(newProps) {
        const ownerStr = DATA.coinRepoKeys[newProps.chartCoin].owner;
        const repoStr = DATA.coinRepoKeys[newProps.chartCoin].repo;
        const cacheKey = COMMON.buildCacheKey(this.providerStr, this.opStr, ownerStr);
        const cachedResponse = COMMON.getCached(cacheKey);
        const chartTitle = DATA.coinRepoKeys[newProps.chartCoin].name;
        let responseJson;

        if (cachedResponse) {
            responseJson = cachedResponse.data;
        } else {
            let responseObj = await fetch(DATA.apiEndPoints[this.providerStr][this.opStr](ownerStr, repoStr));
            responseJson = await responseObj.json();
            COMMON.setCached(cacheKey, responseJson);
        }

        this.setState({
            series: this.buildContributorsSeries(responseJson),
            chartTitle: chartTitle
        });
    }

    buildContributorsSeries(jsonObj) {
        let commitsMap;
        let series = [];

        commitsMap = jsonObj
            .map(value => value.weeks)
            .reduce((sum, value) => sum.concat(value))
            .reduce((sum, value) => {
                sum[value.w] = !!sum[value.w] ? value.c + sum[value.w] : value.c;
                return sum;
            });

        Object.entries(commitsMap).forEach(function (value) {
            let timestamp = parseInt(value[0], 10);
            let commits = value[1];

            if (timestamp) {
                series.push([timestamp, commits]);
            }
        });

        return series;
    }

    render() {
        let chartFormatter = function () {
            return moment(this.value).format("M/D");
        };
        return (
            <Chart chartSeries={this.state.series}
                   chartTitle={this.state.chartTitle}
                   chartFormatter={chartFormatter}
            />
        );
    }
}

export default ContributorsChart;
