# specify the node base image with your desired version node:<version>
FROM node:latest
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
# replace this with your application's default port
EXPOSE 80
# Start server
CMD [ "npm", "start" ]
