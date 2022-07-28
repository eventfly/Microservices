# Pull in the from the official nginx image.
FROM nginx

EXPOSE 80

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*


RUN rm /etc/nginx/conf.d/default.conf
# Copy over the custom default configs.
COPY configs/nginx.conf /etc/nginx/nginx.conf

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]