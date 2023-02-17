FROM node:16.18.1 as builduier
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
