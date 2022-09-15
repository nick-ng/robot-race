FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci

# Bundle app source
COPY . .

RUN npm run build-back
RUN npm run build-front

EXPOSE ${PORT}
CMD [ "node", "./dist-back/main.js"]
