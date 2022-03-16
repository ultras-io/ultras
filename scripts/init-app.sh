#!/usr/bin/env bash
cd "$(dirname "$0")/.." || exit 1
ROOT_DIR="$(realpath "$PWD")"

. "$(dirname "$0")/.helpers.sh"
trap on_process_kill SIGINT

# check yarn installed
if [[ "" == "$(command -v yarn)" ]]; then
  echo ""
  echo "  WHOOPS !!! "
  echo ""
  echo "  Please install yarn then run this script again."
  echo ""

  exit 2
fi

# start
echo ""
echo -e " \033[0;32m================================================================================\033[0m"
echo -e " \033[0;32m======================    ULTRAS APP INITIATOR STARTED    ======================\033[0m"
echo -e " \033[0;32m================================================================================\033[0m"
echo ""

# remove all node_modules folders
set_title "Cleaning old node modules ..."
print_row_wait "Cleaning old node modules"
find . -type d -name node_modules | xargs rm -rf > /dev/null 2>&1
end_cmd_die $? "Couldn't delete node_modules folder(s)."

# remove all build folders
set_title "Cleaning old builds ..."
print_row_wait "Cleaning old builds"
find . -type d -name build | xargs rm -rf > /dev/null 2>&1
end_cmd_die $? "Couldn't delete build folder(s)."

# make linkage
cd "$ROOT_DIR"
if [[ ! -d "node_modules" ]]; then
  set_title "Installing node modules via yarn ..."
  print_row_wait "Installing node modules via yarn"
  yarn install > /dev/null 2>&1
  end_cmd_die $? "Couldn't install node modules."
fi

# make linkage
cd "$ROOT_DIR"
set_title "Linking all sub-packages ..."
print_row_wait "Linking all sub-packages"
yarn link-all > /dev/null 2>&1
end_cmd_die $? "Couldn't make package linkage."

# build packages (ORDER OF PACKAGES IMPORTANT !!!)
ITEMS_BUILD=(\
  "packages/utils"\
  "packages/services"\
  "view-models/core-api"\
  "sdks/core-api-sdk"\
)

for ITEM_BUILD in ${ITEMS_BUILD[@]}; do
  cd "$ROOT_DIR/$ITEM_BUILD"
  PKG_NAME="$(cat package.json | grep '"name":' | sed 's/"name"://g' | sed 's/"//g' | sed 's/,//g' | xargs)"

  if [[ ! -d "build" ]] ; then
    set_title "Building sub-package [$PKG_NAME] ..."
    print_row_wait "Building sub-package [$PKG_NAME]"
    yarn build > /dev/null 2>&1
    end_cmd_die $? "Couldn't build package $PKG_NAME."
  fi
done

# install CocoPods if is in macOS
if [[ "Darwin" == "$(uname)" ]]; then
  if [[ "" == "$(command -v xcode-select)" ]]; then
    # echo "Please install XCode if you want to run iOS app."
    exit
  else
    if [[ "" == "$(command -v gem)" ]]; then
      # echo "Please install Ruby and CocoPods if you want to run iOS app."
      exit
    else
      if [[ "" == "$(command -v pod)" ]]; then
        set_title "Installing CocoaPods engine ..."
        print_row_wait "Installing CocoaPods engine"
        sudo gem install cocoapods > /dev/null 2>&1
        end_cmd_die $? "Couldn't install CocoaPods."
      fi

      cd "$ROOT_DIR/clients/app/ios"

      set_title "Installing CocoaPods packages ..."
      print_row_wait "Installing CocoaPods packages"
      pod install > /dev/null 2>&1
      end_cmd_die $? "Couldn't install CocoaPods packages."
    fi
  fi
fi

echo ""
echo -e " \033[0;32m Yu-hu, initiation completed successfully 🎉 🎉 🎉 \033[0m"
echo ""
