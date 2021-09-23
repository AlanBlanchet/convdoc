import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import pkg from '../../jsonDoc.json';
import '../App.scss';
import Icon from './Icon';
import classImg from '../../assets/image/class.png';
import { CopyBlock, vs2015 as theme } from 'react-code-blocks';

interface DocumentationProps {}

interface DocumentationState {}

class Documentation extends React.Component<
  DocumentationProps,
  DocumentationState
> {
  render() {
    return (
      <div className={`documentation`}>
        <Switch>
          {pkg.codeDocumentation.map((doc, i) => {
            return (
              <Route path={`/doc/${doc.name}`} key={`doc-${i}`}>
                <div
                  className={`documentationBanner`}
                  style={{ backgroundColor: 'rgb(20,150,30)' }}
                >
                  <p>
                    {doc.signature.type} {doc.signature.name}
                  </p>
                  <Icon
                    style={{ width: '30px', height: '30px' }}
                    src={classImg}
                  />
                </div>
                <div className={`documentationContent`}>
                  <CopyBlock
                    text={doc.raw.reduce((prev, cur) => {
                      return prev + cur + '\n';
                    }, '')}
                    language={'typescript'}
                    theme={theme}
                    codeBlock
                    startingLineNumber={doc.start}
                  ></CopyBlock>
                  {doc.comments.map((comment, i) => {
                    return (
                      <div className={`documentationContentComment`}>
                        <h4 key={`comment-${i}`}>@{comment.param}</h4>
                        <p>{comment.content}</p>
                      </div>
                    );
                  })}
                </div>
                <div className={`documentationFooter`}>
                  <p>Local file link : "{doc.file}"</p>
                </div>
              </Route>
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default Documentation;
