#! /bin/bash

cd api

echo 'start api server...'
php artisan serve --port=7500 &
API_SERVER_PID=$!
sleep 1

echo 'start the api service again for debug...'
php artisan serve --port=7501 &
DEBUG_API_SERVER_PID=$!
sleep 1


cd ../web
echo 'start web server...'
yarn start



