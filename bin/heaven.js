#!/usr/bin/env node

const requiredVersion = require('../package.json').engines.node
const leven = require('leven')


checkNodeVersion(requiredVersion, 'heaven-cli')

const fs = require('fs')
const path = require('path')
const slash = require('slash')
const minimist = require('minimist')


const program = require('commander')
// const loadCommand = require('../lib/util/loadCommand')
const init = require("../lib/init");

program
  .version(`heaven-cli ${require('../package').version}`)
  .usage('<command> [options]')


program
  .command('init <template> <app-name>')
  .description('generate a project from a remote template (legacy API, requires @heaven-cli)')
  .option('-c, --clone', 'Use git clone when fetching remote template')
  .option('--offline', 'Use cached template')
  .action(() => {
    init()
    // loadCommand('init', 'heaven-cli')
  })

 
// output help information on unknown commands
program.on('command:*', ([cmd]) => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
  suggestCommands(cmd)
  process.exitCode = 1
})

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`heaven <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function suggestCommands (unknownCommand) {
  const availableCommands = program.commands.map(cmd => cmd._name)

  let suggestion

  availableCommands.forEach(cmd => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd
    }
  })

  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}
