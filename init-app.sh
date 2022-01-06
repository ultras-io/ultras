#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

if [[ "" == "$(command -v yarn)" ]]; then
  echo ""
  echo "  WHOOPS !!! "
  echo ""
  echo "  Please install yarn then run this script again."
  echo ""

  exit 2
fi

ROOT_DIR="$PWD"

# # remove all node_modules and build folders
# find . -type d -name node_modules | xargs rm -rf
# find . -type d -name build | xargs rm -rf

# install typescript globally
if [[ "" == "$(command -v tsc)" ]]; then
  yarn global add typescript
fi

# install rimraf globally
if [[ "" == "$(command -v rimraf)" ]]; then
  yarn global add rimraf
fi

# make linkage
cd "$ROOT_DIR"
if [[ ! -d "node_modules" ]]; then
  echo "Please install node modules (via yarn install), and this script will "
  echo "be called again automatically."
  exit 3
fi

# make linkage
cd "$ROOT_DIR"
yarn link-all
if [[ $? != 0 ]]; then
  echo "Couldn't make package linkage."
  exit 4
fi

# build services
cd "$ROOT_DIR/packages/utils"
if [[ ! -d "build" ]] ; then
  yarn build
  if [[ $? != 0 ]]; then
    echo "Couldn't build package @ultras/utils."
    exit 5
  fi
fi

# build services
cd "$ROOT_DIR/packages/services"
if [[ ! -d "build" ]] ; then
  yarn build
  if [[ $? != 0 ]]; then
    echo "Couldn't build package @ultras/services."
    exit 6
  fi
fi

# build sdks
cd "$ROOT_DIR/sdks/core-api-sdk"
if [[ ! -d "build" ]] ; then
  yarn build
  if [[ $? != 0 ]]; then
    echo "Couldn't build @ultras/core-api-sdk."
    exit 7
  fi
fi

# install CocoPods if is in macOS
if [[ "Darwin" == "$(uname)" ]]; then
  if [[ "" == "$(command -v xcode-select)" ]]; then
    echo "Please install XCode if you want to run iOS app."
    exit 8
  fi

  if [[ "" == "$(command -v gem)" ]]; then
    echo "Please install Ruby and CocoPods if you want to run iOS app."
    exit 9
  fi

  cd "$ROOT_DIR/clients/app/ios"

  if [[ "" == "$(command -v pod)" ]]; then
    sudo gem install cocoapods
  fi

  pod install
fi
