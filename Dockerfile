FROM nginx:alpine
COPY apps/ /usr/share/nginx/html/
EXPOSE 80
