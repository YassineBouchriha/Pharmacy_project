FROM node:16.18.0-alpine3.16  as build
RUN apk update && apk add git
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/

RUN npm run build --prod


FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
