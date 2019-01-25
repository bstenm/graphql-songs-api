FROM node:8

WORKDIR /usr/app

COPY package.json yarn.lock /usr/app/

RUN yarn install

COPY . /usr/app

RUN yarn global add concurrently pm2 typescript

EXPOSE 4000

CMD concurrently -k -p "[{name}]" -n "TypeScript,Node" "tsc -w" "pm2-dev start pm2.json"

