FROM node:14-slim as builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist/fulibWorkflows-editor /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
