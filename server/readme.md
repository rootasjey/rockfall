# Server

```
server
|-- server.js                           // The entry point for running the project application (Creates the Express application)
|-- config/                             // Configuration files used to connect to different machines or set settings
|   |-- passport.js                     // Defines strategies for passport configuration
|   ....
|-- middlewares/                        // Express middleware that process requests before REST API routes
|   ....
|-- models/                             // Represents data and handles business logic for interacting with DB
|   ....  
|-- routes/                             // REST API. A.k.a. "controllers"
|   |-- index.js                        // Handles importing and setting up all other routes
|   .....                     			
|-- helpers/                          // Helper functions used throughout the application
|   ....
```
