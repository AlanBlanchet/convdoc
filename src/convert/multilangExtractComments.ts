export interface multilangExtractComments {
  begin: number;
  end: number;
  codeStart: number;
  content: string;
  info: { type: string; apidoc: boolean };
  code: string;
}
