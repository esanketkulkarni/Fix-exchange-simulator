# Fix Exchange Simulator

This project provides a minimal end-to-end FIX exchange simulator. It exposes an HTTP API for submitting buy/sell orders and serves a simple web UI for manual testing.

## Features

- Node.js backend with in-memory order book and matching engine
- REST-like endpoints to submit orders and retrieve the current book
- Static HTML/JavaScript frontend served from the same server
- Simple test script verifying basic matching behaviour
- Dockerfile for containerized deployment

## Running locally

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

```bash
npm test
```

## Deploying to AWS

1. **Backend**: Build the Docker image and push to Amazon ECR, then run on ECS or another service:
   ```bash
   docker build -t fix-simulator .
   docker run -p 3000:3000 fix-simulator
   ```
   In AWS, expose port 3000 or configure a load balancer.

2. **Frontend**: The static files are served by the Node.js server. If you prefer separate hosting, upload the contents of `public/` to Amazon S3 and configure the backend API endpoint accordingly.

This repository is a starting point for more advanced FIX protocol simulations or integrations.
