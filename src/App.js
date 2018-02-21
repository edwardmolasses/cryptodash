import React, { Component } from 'react';
import './assets/App.css';
import Controls from './Controls';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: []
    };
  }

  componentDidMount() {
  }

  render() {
    return (
        <MuiThemeProvider>
            <Controls />
        </MuiThemeProvider>
    );
  }
}

export default App;
