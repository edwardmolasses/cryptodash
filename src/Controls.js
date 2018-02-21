import React, { Component } from 'react';
import './assets/App.css';
import Github from './Github';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import EditorMonetizationOn from 'material-ui/svg-icons/editor/monetization-on';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectCoin: 'IOTA',
            openMenu: false,
            valueSingle: '3'
        };

        this.handleChangeSelectCoin = this.handleChangeSelectCoin.bind(this);
    }

    handleChangeSingle = (event, value) => {
        this.setState({ selectCoin: value });
    };

    handleChangeSelectCoin(event, value) {
        this.setState({ selectCoin: value });
    }

    render() {
        return (
            <div>
                <span>Coins</span>
                <IconMenu
                    iconButtonElement={<IconButton><EditorMonetizationOn /></IconButton>}
                    onChange={this.handleChangeSelectCoin}
                    value={this.state.selectCoin}
                    className="t5 cp">
                    <MenuItem value="IOTA" primaryText="IOTA" />
                    <MenuItem value="ETH" primaryText="ETHEREUM" />
                    <MenuItem value="OMG" primaryText="OMISEGO" />
                    <MenuItem value="DOGE" primaryText="DOGECOIN" />
                </IconMenu>
                <br /><br />
                <Github chartCoin={this.state.selectCoin} />
            </div>
        );
    }
}

export default Controls;
