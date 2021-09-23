import Language, { Identifiers } from '../language';
import { IdentifierType } from '../types';

export default class Typescript extends Language {
  identifiers: Identifiers = [
    [
      'class',
      (data) => {
        return this.delimiter(data);
      },
      (data) => {
        const split = data.slice(0, data.search('{')).split(' ');
        return {
          type: split[0] as IdentifierType,
          name: split[1]
        };
      }
    ],
    [
      'interface',
      (data) => {
        return this.delimiter(data);
      },
      (data) => {
        const split = data.slice(0, data.search('{')).split(' ');
        return {
          type: split[0] as IdentifierType,
          name: split[1]
        };
      }
    ]
  ];
}
