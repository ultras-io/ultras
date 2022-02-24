#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1
CURRENT_DIR="$PWD"

function exit_app() {
  echo " >>> $2"
  exit $1
}

# build typescript project
cd "$CURRENT_DIR/lambda"
npm run build
if [[ $? != 0 ]]; then
  exit_app 2 "Failed to build lambda function project."
fi
cd "$CURRENT_DIR"

# build aws serverless application model project
sam build
if [[ $? != 0 ]]; then
  exit_app 3 "Failed to build AWS SAM project."
fi

# rebuild sharp inside of built folders
SHARP_PATHS="$(find .aws-sam/build -type d -name sharp | xargs)"
for SHARP_PATH in ${SHARP_PATHS[@]}; do
  cd "$SHARP_PATH"
  npm run install --platform=linux --arch=x64
  cd "$CURRENT_DIR"
done

# deploy aws serverless application model project
sam deploy --guided
if [[ $? != 0 ]]; then
  exit_app 4 "Failed to deploy AWS SAM project."
fi

# cleanup build
cd "$CURRENT_DIR/lambda"
npm run build:cleanup
cd "$CURRENT_DIR"
