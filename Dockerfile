FROM node:22-alpine
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000 STUDIO_DATA_FILE=/data/studio.json
WORKDIR /app
COPY server/ ./server/
COPY web/ ./web/
RUN mkdir -p /data && chown -R node:node /app /data
USER node
EXPOSE 3000
CMD ["node","server/index.js"]
