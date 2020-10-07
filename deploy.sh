#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
atom --wait index.html
git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:dphlai/epios.git master:gh-pages
git push -f https://github.com/dphlai/epios.git master:gh-pages
# git push -u master:gh-pages

cd -
