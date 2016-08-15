# pluralsight-gulp
You've built your JavaScript application but how do you automate testing, code analysis, running it locally or deploying it? These redundant tasks can consume valuable time and resources. Stop working so hard and take advantage of JavaScript task automation using Gulp to streamline these tasks and give you back more time in the day. Studying this repo can help clarify how Gulp works, jump-start task automation with Gulp, find and resolve issues faster, and be a more productive.

## Requirements

- Install Node
	- on OSX install [home brew](http://brew.sh/) and type `brew install node`
	- on Windows install [chocolatey](https://chocolatey.org/) 
    - Read here for some [tips on Windows](http://jpapa.me/winnode)
    - open command prompt as administrator
        - type `choco install nodejs`
        - type `choco install nodejs.install`
- On OSX you can alleviate the need to run as sudo by [following these instructions](http://jpapa.me/nomoresudo). I highly recommend this step on OSX
- Open terminal
- Type `npm install -g node-inspector bower gulp`

## Quick Start
Prior to taking the course, clone this repo and run the content locally
```bash
$ npm install
$ bower install
$ npm start
```

## Code Analysis tools 
-> JSHint 
   - for javascript code analysis to detect errors and pontential problems
-> JSCS
   - JavaScript code style checker
-> jshint-stylish   
   
## logging 
-> gulp-util
   - used for logging 
## printing
-> gulp-print
   - 
## conditioning
-> gulp-if & yargs
  - 
## plugin for the above
-> gulp-load-plugins

## CSS Compilation (# gulp styles)
-> gulp-autoprefixer (Post css, automated, upto date from can i sue http://caniuse.com), customizable, browser options thus visually cascades by default
   - for adding vendor prefixes 
-> gulp-less (variables, mixins, nested rules, imports, operators, functions)
   - for compiling css

## delete files
-> del
   - for deleting particular unwanted files
   
## show error(s) in css
-> gulp-plumber
   - for show errors in a watched css file
   
## Dependency injection
-> wiredep
   - for injecting bower dependencies into html
-> gulp-inject
   - for any custom code injections into html

## nodemon (added support for running a task on fire of the event)
-> gulp-nodemon
   - restart node server
   - watch file changes
   - handle events

## Time-Saving Browser Synchronization
-> BrowserSync
   - watch files and inject file changes into the browser (uses sockets.io)
   - has 'ghostMode' to synchronize changes across browsers
   
 ## task listing, image compression & copying
 -> gulp-task-listing, gulp-imagemin
 
 ## Caching html templates
 ->  gulp-angular-templateCache, gulp-minify-html 
    - gathers all templates with gulp
	- minify the html
	- add them all to $templateCache

## Optimized Production Build Pipeline
-> gulp-useref
   - parse html comments
   - gather all assets from the html comments --> .pipe($.useref.assetc())
   - restore the files back to the stream. --> .pipe($.useref.restore())
   - concatenate file & write out to the index.html --> .pipe($.useref())
   
## Minifying & Filtering
-> gulp-csso CSSO(CSS Optimizer) , gulp-uglify for 'js'
 - filter assets & minify them
 - remove white space & comments
 - mangle code
 - optimize & reduce files sizes
 - restore filters
 
## Mangling & holding AngularJS ID
-> gulp-ng-annotate
   - searches for dependency injection
   - adds injection code if not found
   
## Revisions & Versions
-> gulp-rev, gulp-rev-replace
   - rewrite occurrence of filenames that were updated by gulp-rev
   - file references in html
   - File name revisions  
   - load a new file
   - increment the package version

## Testing Landscape
-> Karma (test-runner to run test-suits)
   - lets one hookup with many testing frameworks like QUnit , Jasmine , Mocha
  - Automate a test runner
  - code covverage
  - automatically run tests during development
  - run server integration tests
  - run test in the browser
  
   ## Single Run
   - runs once and done
   - can fail a build
   - great for CI
   
   ## Always Watching
   - runs and stays alive
   - watches file changes
   - re-runs the tests
   
 ## Gulp Simple APIs
 - gulp.task
 - gulp.src
 - gulp.dest
 - gulp.watch

 
 
## NB ----------------- On windows --------------------
SET NODE_ENV=build & node src/server/app.js
## ----------------------------------------------------