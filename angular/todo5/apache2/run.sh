#!/bin/bash

_APP_HOST=$APP_HOST
_APP_PORT=$APP_PORT
_API_ADDRESS=$API_ADDRESS

if test -z "${_APP_HOST}"; then
    _APP_HOST=0.0.0.0
fi

if test -z "${_APP_PORT}"; then
    _APP_PORT=80
fi

if test -z "${_API_ADDRESS}"; then
    _API_ADDRESS=http://localhost:8080
fi

cp app.conf.gen app.conf

sed -ie 's|{%APP_HOST%}|'$_APP_HOST'|g' app.conf
sed -ie 's|{%APP_PORT%}|'$_APP_PORT'|g' app.conf
sed -ie 's|{%API_ADDRESS%}|'$_API_ADDRESS'|g' app.conf

mv app.conf /etc/apache2/sites-enabled

cp ports.conf.gen ports.conf

sed -ie 's|{%APP_HOST%}|'$_APP_HOST'|g' ports.conf
sed -ie 's|{%APP_PORT%}|'$_APP_PORT'|g' ports.conf

mv ports.conf /etc/apache2

mv .htaccess /app

apache2ctl -D FOREGROUND