#!/usr/bin/env node

import sade from 'sade'
import pinfo from './package.json'
import { newProject } from './src/actions/new'

const prog = sade(pinfo.name);

// 版本
prog
  .version(pinfo.version)
  .option('--global, -g', 'An example global flag')
  .option('-c, --config', 'Provide path to custom config', 'han.config.js')

// 创建项目
prog
  .command('new [type] [name]')
  .describe('初始化模版项目')
  .option('-i, --install', '安装npm依赖', false)
  .example('$ hansin new web my-app -i')
  .example('$ hansin new component my-component')
  .action((type, name, opts) => {
    console.log('extra opts: ', opts);
    newProject({ type, name, opts })
  });

prog
  .command('build <src> <dest>')
  .describe('Build the source directory. Expects an `index.js` entry file.')
  .option('-o, --output', 'Change the name of the output file', 'bundle.js')
  .example('build src build --global --config my-conf.js')
  .example('build app public -o main.js')
  .action((src, dest, opts) => {
    console.log(`> building from ${src} to ${dest}`);
    console.log('> these are extra opts', opts);
  });

prog
  .command('remote')
  .describe('Manage set of tracked repositories')
  .action(opts => {
    console.log('~> Print current remotes...');
  });
 
// remote 子命令
prog
  .command('remote add <name> <url>', 'Demo...')
  .action((name, url, opts) => {
    console.log(`~> Adding a new remote (${name}) to ${url}`);
  });
 
prog
  .command('remote rename <old> <new>', 'Demo...')
  .action((old, nxt, opts) => {
    console.log(`~> Renaming from ${old} to ${nxt}~!`);
  });

prog.parse(process.argv)
