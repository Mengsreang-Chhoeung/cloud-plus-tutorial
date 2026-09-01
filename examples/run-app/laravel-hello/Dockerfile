FROM composer:2 AS build

WORKDIR /app

COPY . .

RUN composer install --no-dev --no-interaction --optimize-autoloader
RUN cp .env.example .env && php artisan key:generate

FROM php:8.4-cli-alpine

RUN apk add --no-cache sqlite-dev \
    && docker-php-ext-install pdo pdo_sqlite

WORKDIR /app

COPY --from=build /app ./

EXPOSE 8080

CMD sh -c "touch database/database.sqlite && php artisan migrate --force && php -S 0.0.0.0:${PORT:-8080} -t public public/index.php"
