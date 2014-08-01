/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('sphinx-docs generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('sphinx-docs:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files with rtd theme ON', function (done) {
        var expected = [
            'make.bat',
            'Makefile',
            'source/conf.py',
            'source/index.rst',
            'source/_themes/sphinx_rtd_theme/theme.conf'
        ];

        helpers.mockPrompt(this.app, {
            'useRTDTheme': true,
            'projectName': 'projectName',
            'authorName': 'authorName',
            'versionNumber': 'versionNumber'
        });

        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });

    it('creates expected files with rtd theme OFF', function (done) {
        var expected = [
            'make.bat',
            'Makefile',
            'source/conf.py',
            'source/index.rst'
        ];

        var notExpected = [
            'source/_themes/sphinx_rtd_theme/theme.conf'
        ];

        helpers.mockPrompt(this.app, {
            'useRTDTheme': false,
            'projectName': 'projectName',
            'authorName': 'authorName',
            'versionNumber': 'versionNumber'
        });

        this.app.run({}, function () {
            helpers.assertFile(expected);
            helpers.assertNoFile(notExpected);
            done();
        });
    });
});
