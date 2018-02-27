import React, { Component } from 'react';
import './assets/App.css';
import DropdownControl from './DropdownControl';
import ContributorsChart from './ContributorsChart';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: []
    };
  }

  render() {
    return (
        <MuiThemeProvider>
            <DropdownControl>
              <ContributorsChart />
            </DropdownControl>
        </MuiThemeProvider>
    );
  }
}

export default App;
