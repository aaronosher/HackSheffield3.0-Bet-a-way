# specify the node base image with your desired version node:<version>
FROM python:latest
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
RUN pip3 install Flask jsonify
# Bundle app source
COPY . /usr/src/app
# replace this with your application's default port
EXPOSE 5000
# Start server
CMD [ "bash", "./start.sh" ]
