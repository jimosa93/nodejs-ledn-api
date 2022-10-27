# Node.js LEDN API
API to manage the existing accounts and transactions

## Usage

Rename the .envexample to .env and add your MONGO_URI and PORT
### Install dependencies:

```sh
npm install
```
### Run Server

```
npm run dev
```
### Run tests:

```sh
npm run test
```

### Build project:

```sh
npm run build
```
## API endpoints:

| REQUEST | URL               | Description               |
| ------- | ----------------- | ------------------------- |
| GET     | /account/:email   | Get an existing account   |
| POST    | /transaction      | Create a new transaction  |
| GET     | /                 | Welcome message           |
