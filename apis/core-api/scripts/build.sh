#!/usr/bin/env bash
cd "$(dirname "$0")/../" || exit 1

function check_exit() {
  local EXIT_CODE=$1
  local MESSAGE=$2

  if [[ $? != 0 ]]; then
    echo ">>"
    echo ">> $MESSAGE"
    echo ">>"

    exit $EXIT_CODE
  fi
}

# install node modules if missing
if [[ ! -d node_modules ]]; then
  npm install
  check_exit $? 'Failed to install node modules.'
fi

# build project
export NODE_OPTIONS="--max-old-space-size=4096"
./node_modules/.bin/tsc --rootDir src
check_exit $? 'Failed to build project.'

# replace folders
if [[ -d dist ]]; then
  rm -rf dist
fi

mv build dist
check_exit $? 'Failed to copy built folder.'

# restart pm2
pm2 restart ecosystem.config.js
pm2 save --force
