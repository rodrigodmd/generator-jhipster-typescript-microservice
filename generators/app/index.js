'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('jdlFiles', { type: String, required: false });
   /* this.option('yarn', {
      description: 'Use Yarn as the package manager',
    });
    this.option('docker', {
      description: 'Install Docker artifacts including a Dockerfile',
    });*/
    if (this.options.jdlFiles){
    } else {
      this.composeWith(require.resolve('../main'));
    }
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
