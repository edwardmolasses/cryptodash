import React, { Component } from 'react';
import './assets/App.css';
import * as DATA from './Data';
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
            openMenu: false
        };

        this.handleChangeSelectCoin = this.handleChangeSelectCoin.bind(this);
    }

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
                    {Object.keys(DATA.coinRepoKeys).map(function(key, index) {
                            return <MenuItem key={index} value={key} primaryText={DATA.coinRepoKeys[key].name} />;
                    })}
                </IconMenu>
                <br /><br />
                <Github chartCoin={this.state.selectCoin} />
            </div>
        );
    }
}

export default Controls;
