#!/bin/bash

echo -e "\033[0;32mDeploying website...\033[0m"

hugo

# delete old gh-pages branch
git branch -D deploy

git checkout -b deploy

# Add changes to git.
git add -f public

# Commit changes.
msg="chore(*): adding public folder `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

git subtree split -P public -b deploy-dist

# Push source and build repos.
git push -f origin deploy-dist:master
git branch -D deploy-dist
git checkout dev
git branch -D deploy

