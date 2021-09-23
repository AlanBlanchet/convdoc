import * as React from 'react';
import Version from './Version';
import pkg from '../../jsonDoc.json';

interface HeaderProps {}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    const { props } = this;
    return (
      <header {...props}>
        <div className={`title`}>{pkg.name}</div>
        <Version />
      </header>
    );
  }
}

export default Header;
