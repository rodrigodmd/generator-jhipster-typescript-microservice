'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('myapp', { type: String, required: false });
    this.option('yarn', {
      description: 'Use Yarn as the package manager',
    });
    this.option('docker', {
      description: 'Install Docker artifacts including a Dockerfile',
    });
    this.props = {
      useYarn : this.options.yarn,
      docker : this.options.docker,
      name : this.options.microerviceName || 'myapp',
      description : 'My cool TypeScript microservice',
      port : '3001',
      version : '1.0.0',
      apiRoot : '/api/v1',
    };
    
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the impressive ${chalk.red('generator-jhipster-typescript-microservice')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: `What's the microservice name?`,
        default: this.props.name
      },
      {
        type: 'input',
        name: 'description',
        message: `What's the microservice description?`,
        default: this.props.description
      },
      {
        type: 'input',
        name: 'port',
        message: `What port should the microservice use?`,
        default: this.props.port
      },
      {
        type: 'input',
        name: 'apiRoot',
        message: `What's th API Root?`,
        default: this.props.apiRoot
      },
      {
        type: 'input',
        name: 'apiVersion',
        message: `What's the API Version?`,
        default: this.props.version
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.log("");
    this.log(chalk.green(`Generating code...`));
    mkdirp.sync(this.props.name);
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(this.props.name), {
          name: this.props.name,
          title: this.props.name,
          description: this.props.description,
          port: this.props.port,
          apiRoot: this.props.apiRoot,
          version: this.props.version,
      }
    );

    // Copy all dotfiles
    this.fs.copyTpl(
      this.templatePath('./.*'),
      this.destinationRoot(this.props.name + "/"), {
        name: this.props.name,
        port: this.props.port,
      }
    );
  }

  install() {
    this.log("");
    this.log(chalk.green(`Resolving dependencies...`));
    if (this.props.useYarn) {
      this.yarnInstall();
    } else {
      this.npmInstall();
    }
    this.config.save();
  }

  end() {
    this.log("");
    this.log(chalk.green("Now it's time to play:"));
    this.log(chalk.green(`        cd ${this.props.name}`));
    this.log(chalk.green(`        npm run dev`));
  }
};
