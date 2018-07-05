#!/usr/bin/env bash

cp -r apache2 dist
cp Dockerfile dist

image=registry.bst-1.cns.bstjpc.com:5000/todo-ui
tag=$(date +'%Y%m%d')

cd dist && docker build -t ${image}:${tag} .

rm -rf apache2
rm -rf Dockerfile