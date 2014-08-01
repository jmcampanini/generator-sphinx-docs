'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var SphinxDocsGenerator = yeoman.generators.Base.extend({

    init: function () {
        this.pkg = require('../package.json');
    },

    askFor: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous Sphinx Docs generator!'));

        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'What would you like to call the project?',
                default: process.cwd().split(path.sep).pop()
            },
            {
                type: 'input',
                name: 'authorName',
                message: 'Who is the author?',
                default: 'someone'
            },
            {
                type: 'input',
                name: 'versionNumber',
                message: 'What version is the project?',
                default: '0.1.0'
            },
            {
                type: 'confirm',
                name: 'useRTDTheme',
                message: 'Use the ReadTheDocs Theme?',
                default: true
            },
            {
                type: 'confirm',
                name: 'installSphinx',
                message: 'Install Sphinx (using ' + chalk.underline('pip install sphinx') + ')?',
                default: false
            },
            {
                type: 'confirm',
                name: 'installAutobuild',
                message: 'Install Sphinx Auto Build (using ' + chalk.underline('pip install sphinx-autobuild') + ')?',
                default: false
            }
        ];

        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;
            this.authorName = props.authorName;
            this.versionNumber = props.versionNumber;
            this.useRTDTheme = props.useRTDTheme;
            this.installSphinx = props.installSphinx;
            this.installAutobuild = props.installAutobuild;

            done();
        }.bind(this));
    },


    sphinx: function () {
        // empty build directory
        this.mkdir('build');

        // src directory
        this.mkdir('source');
        this.mkdir('source/_static');
        this.mkdir('source/_templates');

        this.copy('source/_conf.py', 'source/conf.py');
        this.copy('source/_index.rst', 'source/index.rst');
        this.copy('source/content/first-page.rst', 'source/content/first-page.rst')

        // root level files
        this.copy('_gitignore', '.gitignore');
        this.copy('_make.bat', 'make.bat');
        this.copy('_Makefile', 'Makefile');
    },

    rtdTheme: function () {
        if (this.useRTDTheme) {
            // only copy over the theme if toggled ON
            this.directory('source/_themes', 'source/_themes');
        }
    },

    installSphinx: function () {
        if (this.installSphinx) {
            // only install sphinx if asked too
            this.spawnCommand('pip', ['install', 'sphinx'])
        }
    },

    installAutobuild: function () {
        if (this.installAutobuild) {
            // only install sphinx-autobuild if asked too
            this.spawnCommand('pip', ['install', 'sphinx-autobuild'])
        }
    }
});

module.exports = SphinxDocsGenerator;
