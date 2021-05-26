FROM node:14.15.0-alpine

RUN mkdir /angular
WORKDIR /angular

COPY angular /angular/

RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200