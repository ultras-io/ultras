#!/usr/env/bin bash
cd "$(dirname "$0")" || exit 1

ROOT_DIR="$PWD/../"
HOOK_CMD="$1"

# check is valid script
if [[ "" == "$HOOK_CMD" ]]; then
  echo "Hook name is required (e.g. pre-commit)."
  exit 2
fi

# folder that script need to run
PACKAGES=(
  "apis/core-api"
  "clients/app"
  "packages/cli"
  "packages/services"
  "packages/utils"
  "sdks/core-api-sdk"
)

for PACKAGE in ${PACKAGES[@]}; do
  GIT_HOOK_SCRIPT="$ROOT_DIR/$PACKAGE/hooks/$HOOK_CMD.sh"

  if [[ -f "$GIT_HOOK_SCRIPT" ]]; then
    bash "$GIT_HOOK_SCRIPT"
  fi
done
