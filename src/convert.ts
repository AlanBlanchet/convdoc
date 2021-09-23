// Using glob like in typedoc to extract correct files
import { glob } from 'glob';
import { readFileSync, writeFile } from 'fs';
import { testExtract } from './convert/resolve';
import config from '../convdoc.json';
import path from 'path';
import { Package } from './convert/types';
import pkg from '../package.json';

const pack: Package = {
  name: pkg.name,
  version: pkg.version,
  codeDocumentation: []
};
config.include.forEach((include) => {
  glob.sync(include).map((f) => {
    const data = readFileSync(f, 'utf8');
    pack.codeDocumentation.push(...testExtract(f, data));
  });
});

writeFile(
  path.resolve(__dirname, '../src/jsonDoc.json'),
  JSON.stringify(pack),
  function () {}
);
