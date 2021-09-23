export interface Package {
  name: string;
  version: string;
  codeDocumentation: CodeDocumentation[];
}

export interface CodeDocumentation {
  file: string;
  github?: string;
  start: number;
  end: number;
  comments?: Comment[];
  signature: Signature;
  name: string;
  raw: string[];
  rawComments?: string[];
}

export interface Comment {
  content: string;
  param: CommentParamType;
}

export interface Signature {
  type: IdentifierType;
  name: string;
  options?: string[];
}

export type IdentifierType = 'class' | 'interface' | 'function' | 'variable';
export type CommentParamType =
  | 'param'
  | 'abstract'
  | 'alias'
  | 'argument'
  | 'async'
  | 'augments'
  | 'author'
  | 'borrows'
  | 'callback'
  | 'class'
  | 'classdesc'
  | 'constant'
  | 'constructor'
  | 'constructs'
  | 'copyright'
  | 'default'
  | 'deprecated'
  | 'description'
  | 'emits'
  | 'enum'
  | 'event'
  | 'example'
  | 'exports'
  | 'extends'
  | undefined;
