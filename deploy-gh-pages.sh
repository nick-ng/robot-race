#!/usr/bin/bash

git checkout main
git pull
git branch -D gh-pages
rm -rf ./dist-front/
API_ORIGIN=https://peaceful-cliffs-61555.herokuapp.com npm run build-front
cp ./static/* ./dist-front
cp ./dist-front/index.html ./dist-front/404.html
echo robot-race.pux.one > ./dist-front/CNAME

git checkout --orphan gh-pages
git reset
cp ./dist-front/* ./
git add $(ls ./dist-front)

git commit -m "$(date) deploy front-end"

git push --force origin gh-pages

git add .
git commit -m "$(date) throw away"

git checkout main

git diff --name-status main gh-pages
