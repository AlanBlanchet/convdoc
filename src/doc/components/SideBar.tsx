import * as React from 'react';
import { Link } from 'react-router-dom';
import jsonDoc from '../../jsonDoc.json';
import classImg from '../../assets/image/class.png';
import Icon from './Icon';

interface SideBarProps {}

interface SideBarState {}

class SideBar extends React.Component<SideBarProps, SideBarState> {
  render() {
    return (
      <nav>
        {jsonDoc.codeDocumentation.map((doc, i) => {
          return (
            <Link to={`/doc/${doc.name}`} key={`docName-${i}`}>
              {doc.name} <Icon src={classImg} />
            </Link>
          );
        })}
      </nav>
    );
  }
}

export default SideBar;
