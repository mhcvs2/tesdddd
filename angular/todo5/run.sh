#!/usr/bin/env bash

image=registry.bst-1.cns.bstjpc.com:5000/todo-ui:20180705

docker run -d --name=todo-ui -p80:80 -e API_ADDRESS=http://109.105.4.65:8989 ${image}