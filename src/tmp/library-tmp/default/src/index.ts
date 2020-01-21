/**
 * @fileoverview 基础接口定义和所有的抽象类
 * @author hansincn@gmail.com
 */

const pkg = require('../package.json');

export const version = pkg.version;
export * from './types';
export * from './interfaces';
export { default as Base } from './abstract/base';
