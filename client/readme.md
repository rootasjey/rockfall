Client
======

## TODO
* add classes (rock, board, bonuses)
* board rules

## Tree
```
client
|-- index.html                          // The main container for the client application
|-- server.js                           // The dev server to enable hot reloading
|-- .babelrc                            // File configuration for babel
|-- .eslintrc                           // File configuration for eslint
|-- webpack.config.js                   // The configuration for webpack
|-- src
    |-- index.js                        // The entry point for running the client application (uses hot reloading)
    |-- App.js                          // Main React component where the base app lives
    |-- actions/                        // Redux Actions folders
    |   ....
    |-- components/                     // "Dumb components" - consist of pure React components
    |   |-- static_pages/               // Static pages used in the application written in React
    |   |   ....
    |   ....
    |-- containers/                     // "Smart components" - React components that work with Redux
    |   |-- Root.jsx                    // Creates the routes for the application
    |   |-- App.jsx                     // The main container for the applicatin
    |   ....
    |-- external/                       // External/vendor/Non-npm libraries
    |   ....
    |-- reducers/                       // Redux reducers
    |   |-- RootReducer.js              // Combines all reducers
    |   ....
    |-- helpers/                        // Helper functions used throughout the application
    |   ....
```
