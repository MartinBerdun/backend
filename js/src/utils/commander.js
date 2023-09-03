import { Command } from "commander";

const program = new Command();

program.option('-p <type>', 'persistence type', 'MONGO')
program.option('-e, --enviroment <enviroment>', 'enviroment', 'development')

program.parse(process.argv);

/* export default program */

const options = program.opts()
export const persistenceType = options.p || 'MONGO'
export const environment = options.Env || 'development'

