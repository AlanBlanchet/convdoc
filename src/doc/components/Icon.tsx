import * as React from 'react';

interface IconProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

interface IconState {}

class Icon extends React.Component<IconProps, IconState> {
  render() {
    return <img style={{ width: '20px', height: '20px' }} {...this.props} />;
  }
}

export default Icon;
