# Node.js Cache with Native SQLite

This project is a simple implementation of a cache system using Node.js and SQLite. The main objective of this project is to test the **native implementation of SQLite** in Node.js, taking advantage of the built-in capabilities to handle SQLite databases without relying on external libraries.

## Features

- Store key-value pairs in a SQLite database.
- Set expiration times for cache entries.
- Simple HTTP server to interact with the cache via `GET` and `POST` requests.

## Prerequisites

- Node.js (version 22.5.0 or higher).
- SQLite (optional, as Node.js can handle the database creation automatically with native support).

## Run the project
Clone the repository:

```bash
## https
git clone https://github.com/BrunoSSantana/node-cache-sqlite.git cd sqlite

## github cli
gh repo clone BrunoSSantana/node-cache-sqlite
```

Create the db.sqlite file (if it doesn't exist) and start the Docker containers:

```bash
make docker-up
```

This command will ensure that the db.sqlite file is created if it's missing, and will then build and run the Docker containers.

Stop the server and containers:

```bash
make docker-down
```

To completely clean up (remove the database file and all volumes):

```bash
make clean
```

## Usage

The server provides two main endpoints:

### `GET /`

Retrieve data from the cache by passing query parameters.

- **Example**:
  ```
  GET http://localhost:3000/?key=sampleKey
  ```

- **Response**:
  ```json
  {
    "sampleKey": {}
  }
  ```

### `POST /`

Insert or update a key-value pair in the cache with an expiration time.

- **Example**:
```
  POST http://localhost:3000/
  content-type: application/json
  {
    "key": "sampleKey",
    "value": {
      "sample": "value"
    }
  }
```

- **Response**:
  ```json
  {
    "key": "sampleKey",
    "value": "sampleValue"
  }
  ```

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

This project was specifically created to test and showcase the **native support of SQLite** in Node.js without the use of external libraries like `better-sqlite3` or `sqlite3`. The goal is to evaluate the performance and functionality of SQLite as a lightweight and file-based database system in a cache use case.

## Possible Improvements

- Add more robust error handling and logging.
- Implement a proper cache eviction strategy (e.g., LRU).
- Add tests for cache functionality.

## License

MIT License