import { Signature } from './types';

export default class Language {
  /**
   * @description Whenever we identify this pattern in code, we will call the delimiter function.
   */
  identifiers: Identifiers = [];
  get identifiersKeys(): string[] {
    return this.identifiers.map((e) => e[0]);
  }
  /**
   * @description The function used to get the piece of code.
   * Make sure to get all the code ! We don't know if you're using '{}', indentations or other type of code grouping.
   * What you need to return in a string[] ([] to maintain the line count) :
   * @example class A extends B {
   * ...
   * }
   */
  delimiter: DelimiterFunction = (fData: string[]) => {
    let bracketCountLeft = 0;
    let bracketCountRight = 0;
    let lineNum = 0;
    let b = false;

    for (let lNum = 0; lNum < fData.length; lNum++) {
      const line = fData[lNum];
      for (let i = 0; i < line.length; i++) {
        if (line[i] == '{') bracketCountLeft++;
        else if (line[i] == '}') bracketCountRight++;
        if (bracketCountLeft == bracketCountRight && bracketCountLeft != 0) {
          b = true;
          break;
        }
      }
      lineNum = lNum;
      if (b) break;
    }

    return fData.slice(0, lineNum + 1);
  };
}

export type Identifiers = [string, IdentifierFunction, ExtractorFunction][];

type DelimiterFunction = (fData: string[]) => string[];
type IdentifierFunction = (data: string[]) => string[];
type ExtractorFunction = (lines: string) => Signature;
