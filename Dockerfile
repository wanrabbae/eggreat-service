# Use the official Node.js base image
FROM --platform=linux/amd64 node:18
WORKDIR /eggreat
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
