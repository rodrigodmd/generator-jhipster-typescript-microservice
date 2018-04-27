'use strict';

const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

const semver = require('semver');
const packagejs = require('../../package.json');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');


module.exports = class extends BaseGenerator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('entity', { type: String, required: false });
    //this.option('entity');
   /* this.option('yarn', {
      description: 'Use Yarn as the package manager',
    });
    this.option('docker', {
      description: 'Install Docker artifacts including a Dockerfile',
    });*/

    if (this.options.entity){
      this.composeWith(require.resolve('../entity'));
    } else {
      this.composeWith(require.resolve('../main'));
    }
  }

  get initializing() {
        return {
            init(args) {
                if (args === 'default') {
                    // do something when argument is 'default'
                }
            },
            readConfig() {
                this.jhipsterAppConfig = this.getJhipsterAppConfig();
               /* if (!this.jhipsterAppConfig) {
                    this.error('Can\'t read .yo-rc.json');
                }*/
            },
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster typescript-microservice')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
            },
            checkJhipster() {
                const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(`\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
                }
            }
        };
    }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the impressive ${chalk.red('generator-jhipster-typescript-microservice')} generator!`)
    );
  }

  writing() {
    this.log("");
    this.log(chalk.green(`Generating code...`));
   
  }

  install() {
    
  }

  end() {
   
  }
};
