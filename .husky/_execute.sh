#!/usr/env/bin bash
cd "$(dirname "$0")" || exit 1
CURRENT_PATH="$(realpath "$PWD")"
ROOT_DIR="$(realpath "$PWD/..")"

. "$ROOT_DIR/.helpers.sh"

# fill arguments
SKIP_CHANGES_CHECK="false"
HOOK_COMMAND=""

for ARG in "$@"; do
  if [[ "$ARG" =~ "--skip-check-changes=" ]]; then
    SKIP_CHANGES_CHECK="${ARG:21}"
  elif [[ "$ARG" =~ "--command=" ]]; then
    HOOK_COMMAND="${ARG:10}"
  fi
done

# variables
HOOK_PATH="scripts/git-hooks"
OUTPUT_FILE="$CURRENT_PATH/output/$HOOK_COMMAND.log"
MODIFIED_LIST="$(cd $ROOT_DIR; git status --short | sed 's|[A-Z\?]*||' | grep -v .husky | xargs)"

# check any git modification exists
if [[ "true" == $SKIP_CHANGES_CHECK ]]; then
  HAS_MODIFICATION=0
  for MODIFIED_ITEM in ${MODIFIED_LIST[@]}; do
    HAS_MODIFICATION=1
    break
  done

  if [[ 0 == $HAS_MODIFICATION ]]; then
    exit 0
  fi
fi

# check is valid script
if [[ "" == "$HOOK_COMMAND" ]]; then
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

    GIT_HOOK_SCRIPT="$SUB_PACKAGE/$HOOK_PATH/$HOOK_COMMAND.sh"
    RELATIVE_GIT_HOOK_SCRIPT="$PACKAGE/$(basename "$SUB_PACKAGE")/$HOOK_PATH/$HOOK_COMMAND.sh"
    SUB_PACKAGE_NAME="$(echo "$SUB_PACKAGE" | sed "s|$ROOT_DIR/||")"

    if [[ "true" == $SKIP_CHANGES_CHECK ]]; then
      SUB_PACKAGE_MODIFIED=0
      for MODIFIED_ITEM in ${MODIFIED_LIST[@]}; do
        if [[ "$MODIFIED_ITEM" =~ "$SUB_PACKAGE_NAME" ]]; then
          SUB_PACKAGE_MODIFIED=1
          break
        fi
      done

      if [[ 0 == $SUB_PACKAGE_MODIFIED ]]; then
        echo "---------------------------------------------------------------------------" >> "$OUTPUT_FILE"
        echo "-- No changes found: $RELATIVE_GIT_HOOK_SCRIPT" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"

        print_row_wait "[$HOOK_COMMAND] No changes found $SUB_PACKAGE_NAME"
        print_skip

        continue
      fi
    fi

    if [[ ! -f "$GIT_HOOK_SCRIPT" ]]; then
      echo "---------------------------------------------------------------------------" >> "$OUTPUT_FILE"
      echo "-- Git-hook missing: $RELATIVE_GIT_HOOK_SCRIPT" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"

      print_row_wait "[$HOOK_COMMAND] Git-hook missing $SUB_PACKAGE_NAME"
      print_skip
    else
      echo "---------------------------------------------------------------------------" >> "$OUTPUT_FILE"
      echo "-- Execute git-hook: $RELATIVE_GIT_HOOK_SCRIPT" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"

      print_row_wait "[$HOOK_COMMAND] Execute git-hook $SUB_PACKAGE_NAME"
      bash "$GIT_HOOK_SCRIPT" >> "$OUTPUT_FILE"
      EXIT_CODE=$?

      echo "" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"

      end_cmd_die $EXIT_CODE "Something is not perfect, please fix the issue(s) and then run command again.\n See output in $OUTPUT_FILE"
    fi
  done
done

echo ""
