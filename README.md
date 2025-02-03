# Node.js Cache with Native SQLite
> This project is a simple implementation of a cache system using Node.js and SQLite. The main objective is to test the native implementation of SQLite in Node.js, leveraging its built-in support for handling SQLite databases without external libraries.

## Features
- Store key-value pairs in an SQLite database.
- Set expiration times for cache entries.
- Simple HTTP server to interact with the cache via GET and POST requests.

## Prerequisites
- Node.js (version 22.5.0 or higher).
- Docker (for containerized execution).
- SQLite (optional, as Node.js can handle database creation natively).

## Run the Project
Clone the repository:

```bash
## Clone using HTTPS
git clone https://github.com/BrunoSSantana/node-cache-sqlite.git cd node-cache-sqlite

## Clone using GitHub CLI
gh repo clone BrunoSSantana/node-cache-sqlite
```

Create the db.sqlite file (if it doesn't exist) and start the Docker containers:

```bash
make docker-up
```

This command ensures the db.sqlite file is created if missing, then builds and runs the Docker containers.

Stop the server and containers:

```bash
make docker-dow
```

To completely clean up (remove the database file and all volumes):

```bash
make clean
```

## Usage
The server provides two main endpoints:

### GET /
Retrieve data from the cache by passing query parameters.

Example:
```http
GET http://localhost:3001/?sampleKey
```

Response:
```json
 { "sampleKey": {} }
```

### POST /
Insert or update a key-value pair in the cache with an expiration time.

Example:
```http
POST http://localhost:3001/
content-type: application/json
{
  "key": "sampleKey",
  "value": {
    "sample": "value"
  }
}
```

## Testing the API
After the server is running, you can test the API using the provided requests.http file. This file contains example HTTP requests (GET and POST) and can be used with the Rest Client extension in Visual Studio Code for making HTTP requests directly from your editor.

## Project Structure
```
node-cache-sqlite/
├── src/
│   ├── cache-db.js      # Handles database operations (get/set values)
│   ├── server.js        # Starts the HTTP server
│   └── index.js         # Main entry point
├── db.sqlite            # SQLite database
├── package.json         # Project metadata and scripts
└── README.md            # This file
```

## Native SQLite Implementation
This project was created to test and showcase the native support of SQLite in Node.js, without using external libraries like better-sqlite3 or sqlite3. The goal is to evaluate SQLite's performance and functionality as a lightweight, file-based database in a cache scenario.

## Possible Improvements
- Add more robust error handling and logging.
- Implement a proper cache eviction strategy (e.g., LRU - Least Recently Used).
- Add unit tests for cache functionality.

## License
This project is licensed under the MIT License.