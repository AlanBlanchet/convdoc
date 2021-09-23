import * as React from 'react';
import pkg from '../../jsonDoc.json';

interface VersionProps {}

interface VersionState {}

class Version extends React.Component<VersionProps, VersionState> {
  render() {
    return <div className={`version`}>&gt; v{pkg.version}</div>;
  }
}

export default Version;
