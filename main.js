#!/bin/sh

red=$'\e[1;31m'
grn=$'\e[1;32m'
end=$'\e[0m'

account='training-staging'

if [ "$1" = "" ]
then
  repo="caption-this"
else
  repo=$1
fi

# Build the site
#
# Generate the Jekyll site with an alterate baseurl for the intenral-only
# staging site, but don't start a local server.
printf "\n${grn}# Building site...\n--------------------------------------------------${end}\n"
DISABLE_WHITELIST=1 bundle exec jekyll build --baseurl "/${account}/${repo}"

# Create a temp Git repo to push from
#
# 1. From the compiled Jekyll `_site` directory
# 2. Initialize a new repo within that directory
# 3. Add a new remote called staging that we can push to
# 4. Add all our files
# 5. Write a generic commit message
printf "\n${grn}# Creating a temp Git repo...\n--------------------------------------------------${end}\n"
cd _site && git init && git remote add staging https://ghe.io/${account}/${repo}.git && git add . && git commit -m "Staging latest changes"

# Push the site
#
# Push the new `_site` temporary repo to our remote staging repo, then remove
# the remote again to do it all over again afterwards.
printf "\n${grn}# Publishing...\n--------------------------------------------------${end}\n"
git push staging master:gh-pages --force && git remote rm staging

# Celebrate and open the staging site
printf "\n${grn}# Success!${end}\n"
open https://pages.ghe.io/${account}/${repo}/
