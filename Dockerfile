FROM node:21-slim

RUN npm install -g npm@latest --loglevel=error
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --loglevel=error

COPY . .

RUN REACT_APP_API_URL=http://localhost:8080 SKIP_PREFLIGHT_CHECK=true npm run build --prefix client

EXPOSE 8080

CMD [ "npm", "start" ]
