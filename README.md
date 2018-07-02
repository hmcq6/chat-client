# chat-client

This README outlines the details of how to set up the (Ember + Redis + Node + WebSockets) Chat Client. The chat client connects with the server to display the messages stored in Redis. 

## Overview

The `chat-client` Ember app is a WebSockets based chat room client, intended to be used in tandem with the Node based [`chat-server`](https://github.com/hmcq6/chat-server). The `chat-client` app will attempt to establish a WebSockets connection with the server. If the connection is susccessful the client will listen for messages sent over the WebSockets connection, the client will also broadcast messages over the socket to be stored by the server.

Users are able to change the chatroom channel and their username using the menu in the upper right hand corner.

## Network Diagram
![(Ember + Redis + Node + WebSockets) chat network diagram](https://drive.google.com/uc?export=view&id=1uty6TKiL5NvknUNJgQAomB7D9PgH9ti3)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Redis](https://redis.io/download)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd chat-client`
* `npm install`

## Running / Development

* Start the `chat-server`, this app connects to the server over port 7611
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
