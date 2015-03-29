FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
COPY ./client /client
COPY ./dist /dist
COPY ./e2e /e2e
COPY ./server /server
COPY . .



# Install app dependencies
RUN npm install

EXPOSE  8080
CMD ["node", "/src/index.js"]