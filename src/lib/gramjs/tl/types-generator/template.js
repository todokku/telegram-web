// Not sure what they are for.
const WEIRD_TYPES = new Set(['Bool', 'X', 'Type'])

module.exports = ({ types, constructors, functions }) => {
    function groupByKey(collection, key) {
        return collection.reduce((byKey, member) => {
            const keyValue = member[key] || '_'

            if (!byKey[keyValue]) {
                byKey[keyValue] = [member]
            } else {
                byKey[keyValue].push(member)
            }

            return byKey
        }, {})
    }

    function renderTypes(types, indent) {
        return types.map(({ name, constructors }) => `
      ${!constructors.length ? '// ' : ''}export type Type${upperFirst(name)} = ${constructors.map((name) => name)
            .join(' | ')};
    `.trim())
            .join(`\n${indent}`)
    }

    function renderConstructors(constructors, indent) {
        return constructors.map(({ name, argsConfig }) => `
      export class ${upperFirst(name)} extends VirtualClass<{
${indent}  ${Object.keys(argsConfig)
            .map((argName) => `
        ${renderArg(argName, argsConfig[argName])};
      `.trim())
            .join(`\n${indent}  `)}
${indent}}> {
${indent}  ${Object.keys(argsConfig)
            .map((argName) => `
        ${renderArg(argName, argsConfig[argName])};
      `.trim())
            .join(`\n${indent}  `)}
${indent}};`.trim())
            .join(`\n${indent}`)
    }

    function renderRequests(requests, indent) {
        return requests.map(({ name, argsConfig, result }) => `
      export class ${upperFirst(name)} extends Request<Partial<{
${indent}  ${Object.keys(argsConfig)
            .map((argName) => `
        ${renderArg(argName, argsConfig[argName])};
      `.trim())
            .join(`\n${indent}  `)}
${indent}}>, ${renderResult(result)}> {
${indent}  ${Object.keys(argsConfig)
            .map((argName) => `
        ${renderArg(argName, argsConfig[argName])};
      `.trim())
            .join(`\n${indent}  `)}
${indent}};`.trim())
            .join(`\n${indent}`)
    }

    function renderResult(result) {
        const vectorMatch = result.match(/[Vv]ector<([\w\d.]+)>/)
        const isVector = Boolean(vectorMatch)
        const scalarValue = isVector ? vectorMatch[1] : result
        const isTlType = Boolean(scalarValue.match(/^[A-Z]/)) || scalarValue.includes('.')

        return renderValueType(scalarValue, isVector, isTlType)
    }

    function renderArg(argName, argConfig) {
        const {
            isVector, isFlag, skipConstructorId, type
        } = argConfig

        const valueType = renderValueType(type, isVector, !skipConstructorId)

        return `${argName === 'flags' ? '// ' : ''}${argName}${isFlag ? '?' : ''}: ${valueType}`
    }

    function renderValueType(type, isVector, isTlType) {
        if (WEIRD_TYPES.has(type)) {
            return type
        }

        let resType

        if (typeof type === 'string' && isTlType) {
            resType = `Type${type}`
        } else {
            resType = type
        }

        if (isVector) {
            resType = `${resType}[]`
        }

        return resType
    }

    function upperFirst(str) {
        return `${str[0].toUpperCase()}${str.slice(1)}`
    }

    const typesByNs = groupByKey(types, 'namespace')
    const constructorsByNs = groupByKey(constructors, 'namespace')
    const requestsByNs = groupByKey(functions, 'namespace')

    // language=TypeScript
    return `
// This file is autogenerated. All changes will be overwritten.

import { BigInteger } from 'big-integer';

export default Api;

namespace Api {

  type AnyClass = new (...args: any[]) => any;
  type I<T extends AnyClass> = InstanceType<T>;
  type ValuesOf<T> = T[keyof T];
  type AnyLiteral = Record<string, any>;
  type Buffer = Uint8Array;

  type Reader = any; // To be defined.
  type Client = any; // To be defined.
  type Utils = any; // To be defined.

  type X = unknown; // TODO Verify this.
  type Type = unknown; // TODO Verify this.
  type Bool = boolean;
  type int128 = number;
  type int256 = number;
  type long = number[] | string | BigInteger;
  type bytes = string | Uint8Array;

  class VirtualClass<Args extends AnyLiteral> {
    static CONSTRUCTOR_ID: number;
    static SUBCLASS_OF_ID: number;

    static serializeBytes(data: Buffer | string): Buffer;
    static serializeDate(date: Date | number): Buffer;
    static fromReader(reader: Reader): VirtualClass<Args>;

    CONSTRUCTOR_ID: number;
    SUBCLASS_OF_ID: number;

    constructor(args: Args);
  }

  class Request<Args, Response> extends VirtualClass<Partial<Args>> {
    static readResult(reader: Reader): Buffer;
    static resolve(client: Client, utils: Utils): Promise<void>;

    __response: Response;
  }

  ${renderTypes(typesByNs._, '  ')}
  ${Object.keys(typesByNs)
        .map(namespace => namespace !== '_' ? `
  export namespace ${namespace} {
    ${renderTypes(typesByNs[namespace], '    ')}
  }` : '')
        .join('\n')}

  ${renderConstructors(constructorsByNs._, '  ')}
  ${Object.keys(constructorsByNs)
        .map(namespace => namespace !== '_' ? `
  export namespace ${namespace} {
    ${renderConstructors(constructorsByNs[namespace], '    ')}
  }` : '')
        .join('\n')}

  ${renderRequests(requestsByNs._, '  ')}
  ${Object.keys(requestsByNs)
        .map(namespace => namespace !== '_' ? `
  export namespace ${namespace} {
    ${renderRequests(requestsByNs[namespace], '    ')}
  }` : '')
        .join('\n')}

  export type AnyRequest = ${requestsByNs._.map(({ name }) => upperFirst(name))
        .join(' | ')}
    | ${Object.keys(requestsByNs)
        .filter(ns => ns !== '_')
        .map(ns => requestsByNs[ns].map(({ name }) => `${ns}.${upperFirst(name)}`)
            .join(' | '))
        .join('\n    | ')};

}
`
}
