# Use the latest PHP official image
FROM php:latest

ENV COMPOSER_ALLOW_SUPERUSER=1

# Install PHPStan
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer global require phpstan/phpstan

# Add Composer's global bin directory to the PATH
ENV PATH="${PATH}:/root/.composer/vendor/bin"

# Set the working directory
WORKDIR /app

# Copy your PHP code to the container
COPY src/php /app

# Run PHPStan on your code
CMD ["phpstan", "analyze"]