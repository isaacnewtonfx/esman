# set base image
FROM node:12.14.0-slim

# set working directory. Container commands run from here
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy package.json file to the container
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the code to the container
COPY . ./

# build the app
RUN npm run build


# start app
CMD ["npm", "start"]