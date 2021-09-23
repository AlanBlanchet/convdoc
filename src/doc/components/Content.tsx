import * as React from 'react';
import { Route } from 'react-router';
import Documentation from './Documentation';

interface ContentProps {}

interface ContentState {}

class Content extends React.Component<ContentProps, ContentState> {
  render() {
    return (
      <div className={`content`}>
        <Route path='/' exact>
          Hello world
        </Route>
        <Route path='/doc'>
          <Documentation />
        </Route>
      </div>
    );
  }
}

export default Content;
