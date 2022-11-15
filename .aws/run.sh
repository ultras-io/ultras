# initiate script
cd "$(dirname "$0")" || exit 1
ROOT_DIR="$PWD"

# functions
function app_exist_with_error() {
  echo ""
  echo " >>> ERROR:"
  echo " >>> $2"
  echo ""

  exit $1
}

function app_print_usage() {
  echo ""
  echo "Script usage: bash ./run.sh [ACTION] [LAMBDA]"
  echo "    [ACTION] -> must be one of \"update\" or \"create\"."
  echo "    [LAMBDA] -> lambda folder name."
  echo ""
  echo "Example:"
  echo "  bash ./run.sh create s3-lambda-resizer"
  echo ""

  app_exist_with_error 2 "Invalid usage of script."
}

function load_env_vars() {
  if [[ ! -f .env ]]; then
    app_exist_with_error 3 "Please create .env file."
  fi

  source .env
}

function install_npm() {
  if [[ ! -d node_modules ]]; then
    npm install
    if [[ $? != 0 ]]; then
      app_exist_with_error 4 "Failed to install node modules."
    fi
  fi
}

function aws_config_profile() {
  local PROFILE_NAME="$1"

  CRED_FILE="$HOME/.aws/credentials"
  LINES="$(cat $CRED_FILE | grep $PROFILE_NAME | wc -l | tr -d ' ')"

  if [[ $LINES == 0 ]]; then
    echo "[$PROFILE_NAME]" >> "$CRED_FILE"
    echo "aws_access_key_id = $ACCESS_KEY_ID" >> "$CRED_FILE"
    echo "aws_secret_access_key = $ACCESS_SECRET" >> "$CRED_FILE"
    echo "" >> "$CRED_FILE"
  fi
}

function lambda_build() {
  npm run build
  if [[ $? != 0 ]]; then
    app_exist_with_error 5 "Failed to build lambda function project."
  fi
}

function lambda_compress() {
  zip -r ultras-aws-lambda.zip .
  if [[ $? != 0 ]]; then
    app_exist_with_error 6 "Failed to compress build code."
  fi
}

function lambda_update() {
  local FUNCTION_NAME="$1"

  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION" \
    --zip-file "fileb://ultras-aws-lambda.zip"

  if [[ $? != 0 ]]; then
    app_exist_with_error 7 "Failed to upload lambda function code to AWS."
  fi
}

function lambda_create() {
  local FUNCTION_NAME="$1"
  local ATTACH_POLICIES="$2"
  local ROLE_NAME="RoleLambda-$FUNCTION_NAME"

  aws iam create-role \
    --role-name "$ROLE_NAME" \
    --assume-role-policy-document file://trust-policy.json

  if [[ $? != 0 ]]; then
    app_exist_with_error 8 "Failed to create lambda role in AWS."
  fi

  aws iam attach-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"

  if [[ $? != 0 ]]; then
    app_exist_with_error 9 "Failed to attach Lambda role in AWS."
  fi

  if [[ ! -z "$ATTACH_POLICIES" ]]; then
    for ATTACH_POLICY in ${ATTACH_POLICIES[@]}; do
      aws iam attach-role-policy \
        --role-name "$ROLE_NAME" \
        --policy-arn "arn:aws:iam::aws:policy/$ATTACH_POLICY"

      if [[ $? != 0 ]]; then
        app_exist_with_error 10 "Failed to attach S3 role in AWS."
      fi
    done
  fi

  aws lambda create-function \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION" \
    --role "arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME" \
    --runtime nodejs16.x \
    --handler "app.handler" \
    --timeout 900 \
    --zip-file "fileb://ultras-aws-lambda.zip"

  if [[ $? != 0 ]]; then
    app_exist_with_error 11 "Failed to upload lambda function code to AWS."
  fi
}

function lambda_cleanup() {
  npm run build:cleanup
  if [[ $? != 0 ]]; then
    app_exist_with_error 12 "Failed to cleanup built output."
  fi
}

# start script
if [[ $# != 2 ]]; then
  app_print_usage
fi

RUN_ACTION="$1"
RUN_LAMBDA="$2"

if [[ "$RUN_ACTION" != "create" && "$RUN_ACTION" != "update" ]]; then
  app_print_usage
fi

LAMBDA_DIR="$ROOT_DIR/$RUN_LAMBDA"
if [[ ! -d "$LAMBDA_DIR" ]]; then
  app_exist_with_error 10 "Lambda function does not exists: \"$RUN_LAMBDA\"."
fi

# initial configuration
export AWS_PAGER=""

cd "$LAMBDA_DIR"
load_env_vars
aws_config_profile "$RUN_LAMBDA"

# init modules
cd "$LAMBDA_DIR/lambda"
install_npm
lambda_build

# zip the code
cd "$LAMBDA_DIR/lambda/build"
lambda_compress

# upload built source code
if [[ "$RUN_ACTION" == "create" ]]; then
  cp "$ROOT_DIR/trust-policy.json" "$LAMBDA_DIR/lambda/build"

  if [[ -f "$LAMBDA_DIR/policies.txt" ]]; then
    ATTACH_POLICIES="$(cat $LAMBDA_DIR/policies.txt | xargs)"
  else
    ATTACH_POLICIES=""
  fi

  lambda_create "$RUN_LAMBDA" "$ATTACH_POLICIES"
else
  lambda_update "$RUN_LAMBDA"
fi

# cleanup build
cd "$LAMBDA_DIR/lambda"
npm run build:cleanup
