# Blog-Aggregator

## Installation
npm i

## Config File
For the CLI to run you will need to create an .gatorconfig.json. 
The file should be placed in your root folder (~/.gatorconfig.json)
And should look like this:

{
  "db_url": "connection_string",
  "current_user_name": "username"
}

connection_string - connection credentials string for the PostgreSQL database
current_user_name - this will be set by CLI

## Commands
npm run start register <username>
register new user and set the current user to it

npm run start addfeed <feedName> <feedURL>
add feed for current user, feedName and feedURL arguments are required

npm run start follow <feedURL>
follow existing feed

npm run start login <username>
login (set current user) to a previously registered user

### TODO

- Add sorting and filtering options to the browse command
- Add pagination to the browse command
- Add concurrency to the agg command so that it can fetch more frequently
- Add a search command that allows for fuzzy searching of posts
- Add bookmarking or liking posts
- Add a TUI that allows you to select a post in the terminal and view it in a more readable format (either in the terminal or open in a browser)
- Add an HTTP API (and authentication/authorization) that allows other users to interact with the service remotely
- Write a service manager that keeps the agg command running in the background and restarts it if it crashes


### tsconfig.json
- **include** specifies the files to include in the compilation
- **exclude** specifies the files to exclude from the compilation
- **strict** enables all strict type checking options
- **esModuleInterop** allows you to use ES module syntax
- **moduleResolution** specifies how modules are resolved
- **baseURL** specifies the base directory for module resolution

Check the config file command:
cat ~/.gatorconfig.json