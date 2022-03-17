FROM node:14-alpine3.10 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:14-alpine3.10 as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/build ./
RUN npm install --only=production

FROM node:14-alpine3.10
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
# We have to copy the config.ini file, otherwise it will not be present
# on the image
COPY ./src/config/config.ini /usr/app/config/config.ini
EXPOSE 3000
CMD ["main.js"]