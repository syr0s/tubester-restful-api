FROM node:16-alpine3.15 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:16-alpine3.15 as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/build ./
RUN npm install --only=production

FROM node:16-alpine3.15
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
# We have to copy the config.ini file, otherwise it will not be present
# on the image
COPY ./src/config/config.ini /usr/app/config/config.ini
# Copy all cron job scripts
COPY ./cron /etc/periodic
# Install python/pip (requirement of youtube-dl)
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
# Install youtube-dl
RUN wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl
RUN chmod a+rx /usr/local/bin/youtube-dl
# Install ffmpeg
RUN apk add  --no-cache ffmpeg
EXPOSE 3000
CMD ["main.js"]