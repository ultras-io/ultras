#!/usr/env/bin bash
cd "$(dirname "$0")" || exit 1

CURRENT_PATH="$(realpath "$PWD")"
ROOT_DIR="$(realpath "$PWD/..")"
HOOK_CMD="$1"
HOOK_PATH="scripts/git-hooks"
OUTPUT_FILE="$CURRENT_PATH/output/$HOOK_CMD.log"

# check is valid script
if [[ "" == "$HOOK_CMD" ]]; then
  echo "Hook name is required (e.g. pre-commit)."
  exit 2
fi

# folder that script need to run
PACKAGES_ROOT=(
  "apis"
  # "clients"
  "packages"
  "sdks"
)

rm -f "$OUTPUT_FILE"
touch "$OUTPUT_FILE"

echo ""

for PACKAGE in ${PACKAGES_ROOT[@]}; do
  PACKAGE_PATH="$ROOT_DIR/$PACKAGE"
  SUB_PACKAGES="$(find "$PACKAGE_PATH" -maxdepth 1 -type d)"
  for SUB_PACKAGE in ${SUB_PACKAGES[@]}; do
    if [[ "$SUB_PACKAGE" == "$PACKAGE_PATH" ]]; then
      continue
    fi

    GIT_HOOK_SCRIPT="$SUB_PACKAGE/$HOOK_PATH/$HOOK_CMD.sh"

    if [[ -f "$GIT_HOOK_SCRIPT" ]]; then
      RELATIVE_GIT_HOOK_SCRIPT="$PACKAGE/$(basename "$SUB_PACKAGE")/$HOOK_PATH/$HOOK_CMD.sh"
      echo "---------------------------------------------------------------------------" >> "$OUTPUT_FILE"
      echo "-- Executing: $RELATIVE_GIT_HOOK_SCRIPT" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"

      echo -en "  Executing $RELATIVE_GIT_HOOK_SCRIPT ... "
      bash "$GIT_HOOK_SCRIPT" >> "$OUTPUT_FILE"

      if [[ $? != 0 ]]; then
        echo "FAIL"
        echo ""

        echo -en "\033[0;31m"
        echo "  Oooops !!!"
        echo "  "
        echo "  Something is not perfect, please fix the issue(s) and then run command again."
        echo "  See output in $OUTPUT_FILE"
        echo "  "
        echo -en "\033[0m"

        exit 3
      fi

      echo "DONE"

      echo "" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    fi
  done
done

echo ""
