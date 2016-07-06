# angular-videopodcast-cnn-proxy

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Info

* AngularJS 1.5.6
* Bootstrap 3
* Unit tested except element directives
* Precises a node proxy not contained in this repo


## Features

* Keyboard supported
* Keyboard hint/help
* Search box
* Managed proxy error responses
* Mobile friendly
* Optimized for the layout 1280*720


## Dependencies

* npm
* bower
* grunt-cli


## Build & development

1. If needed install the dependecies globally

2. Inside the repo folder: `npm install && bower install`

3. Run `grunt` for building, `grunt serve` for preview the develpoment code and `grunt serve:dist` for preview the production code.

4. If the node proxy was installed in another machine or if you have any problems with the proxy, set the ip or dns of that machine in apiHost (line 59 of /app/scripts/services/dataservice.js)


## Testing

Running `grunt test` will run the unit tests with karma.


### Live Demo ###

* [https://angular-videopodcast-cnn-proxy.herokuapp.com/#/](https://angular-videopodcast-cnn-proxy.herokuapp.com/#/)
