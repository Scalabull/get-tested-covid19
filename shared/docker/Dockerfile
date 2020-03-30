#FROM node:10
#
#ENV HOME /opt/get-tested-covid19
#ENV PATH /app/node_modules/.bin:$PATH
#
#RUN mkdir $HOME
#WORKDIR $HOME
#
#
#COPY package.json $HOME/package.json
#COPY package-lock.json $HOME/package-lock.json
#
#COPY src $HOME/src
#COPY public $HOME/public
#
#RUN npm install pm2 -g
#RUN npm install --production
#RUN npm run build
#
#
#RUN apt-get remove --purge -y build-essential git python &&\
#    apt-get autoremove --purge -y
#
#EXPOSE 3000
#ENTRYPOINT [ "/start.sh" ]
#
#HEALTHCHECK --start-period=10s --interval=5m --timeout=3s \
#  CMD nc -z localhost 3000 || exit 1


FROM mhart/alpine-node:12 AS builder
WORKDIR /app
COPY . .
RUN yarn --pure-lockfile
#RUN npm install --production
RUN npm run build

RUN yarn install pm2 -g

RUN npm run server:start
#CMD ["serve", "-p", "80", "-s", "."]
