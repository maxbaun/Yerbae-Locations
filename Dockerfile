FROM nginx:1.11.10-alpine

RUN apk --update add nodejs

WORKDIR /root/app

COPY . .

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install && \
	npm run build

RUN mv public /var/www

RUN rm -rf /root/app

COPY nginx.conf /etc/nginx/conf.d/default.conf
