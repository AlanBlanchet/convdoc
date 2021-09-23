import './App.scss';
import * as React from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <main>
            <SideBar />
            <Content />
          </main>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
