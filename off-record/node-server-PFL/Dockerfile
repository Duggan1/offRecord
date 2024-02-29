FROM ghcr.io/puppeteer/puppeteer:19.7.2

# Skip Puppeteer's Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install Google Chrome Stable
RUN apt-get update && \
    apt-get install -y wget gnupg2 apt-utils && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable

# Install npm dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

CMD ["node", "server.js"]
