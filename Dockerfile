# Dockerfile for Rails + Vite development
FROM ruby:3.2

# Install needed packages: Node, npm, and PostgreSQL client
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends build-essential libpq-dev nodejs npm && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Ruby dependencies if Gemfile exists
COPY Gemfile Gemfile.lock ./
RUN bundle install || true

# Install Node dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose Rails and Vite ports
EXPOSE 3000 5173

# Default command starts the Rails server
CMD ["bash", "-c", "bundle exec rails s -b 0.0.0.0 -p 3000"]
