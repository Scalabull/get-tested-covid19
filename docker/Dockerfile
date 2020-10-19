FROM node:12-alpine
COPY . .
RUN yarn install --production
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", "expressServer.js"]
