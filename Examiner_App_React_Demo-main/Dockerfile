FROM node:18.13.0-alpine
WORKDIR /app
ENV REACT_APP_API_URL=http://127.0.0.1:8000
ENV REACT_APP_BASE_URL=http://localhost:3002
COPY . .
# RUN npm run build
RUN npm install
EXPOSE 3002
CMD ["npm","start"]