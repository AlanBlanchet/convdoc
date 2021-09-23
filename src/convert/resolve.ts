import { commentTypes } from './globals';
import Language from './language';
import Typescript from './languages/typescript';
import { CodeDocumentation, Comment, CommentParamType } from './types';

const lang: Language = new Typescript();

export const testExtract = (
  file: string,
  data: string
): CodeDocumentation[] => {
  // Get the comments, then get the target (the target of the comment)
  const dataArr = data.split(/\r?\n/);
  const codeDocumentation: CodeDocumentation[] = [];

  for (let i = 0; i < dataArr.length; i++) {
    const r = new RegExp(regexConf.commentStart);
    let d: RegExpExecArray | null | string = r.exec(dataArr[i]);
    if (d != null) {
      const raw: string[] = [];
      const start = i + 1;
      raw.push(d.input);

      const r2 = new RegExp(regexConf.commentBetween);
      d = '';
      while (d != null) {
        d = r2.exec(dataArr[++i]);
        if (d == null || d[0].match(regexConf.commentEnd)) {
          d && raw.push(d.input);
          break;
        } else raw.push(d.input);
      }
      const keys = lang.identifiersKeys;
      let k = 0;
      for (; k < keys.length; k++) {
        if (dataArr[i + 1].includes(keys[k])) {
          raw.push(...lang.identifiers[k][1](dataArr.slice(i + 1)));
          break;
        }
      }

      codeDocumentation.push({
        file,
        start,
        end: start + raw.length - 1,
        get comments(): Comment[] {
          const split =
            this.rawComments?.filter(
              (c: string) => !c.match(regexConf.commentEnd)
            ) ?? [];
          const decorators: [CommentParamType, string][] = [];
          let currentDec: CommentParamType = 'description';
          for (let line of split) {
            line = line.trim();
            line = line.match(regexConf.commentStart)
              ? line.slice(3).trim()
              : line.slice(1).trim();
            const extractedComment = extractParamType(line);
            if (!extractedComment.content) continue;

            currentDec =
              extractedComment.param != undefined
                ? extractedComment.param
                : currentDec;

            const elem = decorators.find((e) => e[0] == currentDec);

            elem
              ? (elem[1] += '\n' + extractedComment.content)
              : decorators.push([currentDec, extractedComment.content]);
          }

          return decorators.map((a) => {
            return { param: a[0], content: a[1] };
          });
        },
        get rawComments(): string[] {
          const comments: string[] = [];
          if (this.raw[0].match(regexConf.commentStart)) {
            for (let i = 0; i < this.raw.length; i++) {
              comments.push(this.raw[i]);
              if (this.raw[i].match(regexConf.commentEnd)) break;
            }
          }
          return comments;
        },
        signature: lang.identifiers[k][2](
          dataArr.slice(i + 1).reduce((a, c) => a + c, '')
        ),
        get name() {
          return this.signature.name;
        },
        raw
      });
    }
  }
  return codeDocumentation;
};

const extractParamType = (line: string): Comment => {
  const content = line.split(' ');
  const c = content[0].slice(1);
  return commentTypes.includes(c)
    ? {
        content: content
          .slice(1)
          .reduce((a, c) => a + ' ' + c, '')
          .trim(),
        param: c as CommentParamType
      }
    : {
        content: line,
        param: undefined
      };
};

const regexConf = {
  commentStart: /^\s*\/\*\*.*$/,
  commentBetween: /^\s*\*.*$/,
  commentEnd: /^\s*\*\/$/
};
