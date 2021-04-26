# Development Env

# pull the base image 
FROM node:lts-alpine as builder

# set the working directory
WORKDIR /todo-app

# install dependencies
COPY package.json yarn.lock ./

RUN yarn install 

# add app
COPY . ./ 

# install node modules and build assets
RUN yarn install && yarn build

#Production Env

# Pull base image
FROM nginx:stable-alpine

# Working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder
COPY --from=builder /todo-app/build .

# Run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]