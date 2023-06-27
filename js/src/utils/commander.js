import { Command } from "commander";

const program = new Command();

program
    .option('-e, --enviroment <enviroment>', 'enviroment', 'development')

program.parse(process.argv);

console.log(program.opts());

export default program



/* program
  .requiredOption(
    "--mode <mode>",
    "environment",
    "environmant has not been specified"
  )
  .parse();

const { mode } = program.opts();

console.log(mode);

dotenv.config({
  path: mode === "production" ? "./.env.production" : "./.env.development",
});

const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  adminUser: process.env.ADMIN_USER,
  adminPassword: process.env.ADMIN_PASSWORD,
};

export default config; */