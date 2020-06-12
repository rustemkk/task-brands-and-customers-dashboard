FROM node:12.4.0

# install dependencies & build
WORKDIR /
COPY . /.
RUN npm install --quiet
RUN npm run build

# serve
CMD npm run serve
