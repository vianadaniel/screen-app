FROM node:21-slim

RUN npm install -g npm@latest --loglevel=error
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --loglevel=error

COPY . .

# Set environment variables
ENV REACT_APP_API_URL=http://localhost:8080
ENV SKIP_PREFLIGHT_CHECK=true

# Build the React app
RUN npm run build --prefix client

EXPOSE 8080

CMD [ "npm", "start" ]
