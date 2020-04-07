FROM mhart/alpine-node:12
WORKDIR /app
COPY . .
RUN npm install --production
RUN npm run build
RUN npm install pm2 -g
ENTRYPOINT ["pm2", "serve", "./build", "3000", "--spa", "--no-daemon"]
