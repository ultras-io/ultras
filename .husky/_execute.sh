#!/usr/env/bin bash
cd "$(dirname "$0")" || exit 1
CURRENT_PATH="$(realpath "$PWD")"
ROOT_DIR="$(realpath "$PWD/..")"

source "$ROOT_DIR/scripts/.helpers.sh"
trap on_process_kill SIGINT

# fill arguments
ADD_GIT_FILE="false"
SKIP_CHANGES_CHECK="false"
CONTINUE_ON_ERROR="false"
IGNORE_MISSING_SUBPACKAGE="false"
HOOK_COMMAND=""

for ARG in "$@"; do
  if [[ "$ARG" =~ "--add-git-files-on-finish=" ]]; then
    ADD_GIT_FILE="${ARG:16}"
  elif [[ "$ARG" =~ "--skip-check-changes=" ]]; then
    SKIP_CHANGES_CHECK="${ARG:21}"
  elif [[ "$ARG" =~ "--hook-command=" ]]; then
    HOOK_COMMAND="${ARG:15}"
  elif [[ "$ARG" =~ "--ignore-missing-subpackage=" ]]; then
    IGNORE_MISSING_SUBPACKAGE="${ARG:28}"
  elif [[ "$ARG" =~ "--continue-on-error=" ]]; then
    CONTINUE_ON_ERROR="${ARG:20}"
  fi
done

# variables
HOOK_PATH="scripts/git-hooks"
# OUTPUT_FILE="$CURRENT_PATH/output/$HOOK_COMMAND.$(date +%Y-%m-%d.%H:%M).log"
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

# execution function
HAS_EXECUTION_ERROR=0
function execute_git_hook_command() {
  local EXECUTION_PATH="$1"
  local HOOK_FILE_REAL="$2"
  local HOOK_FILE_ALIAS="$3"
  local SUB_PACKAGE_NAME="$4"

  if [[ "true" == $SKIP_CHANGES_CHECK ]]; then
    SUB_PACKAGE_MODIFIED=0
    for MODIFIED_ITEM in ${MODIFIED_LIST[@]}; do
      if [[ "$MODIFIED_ITEM" =~ "$SUB_PACKAGE_NAME" ]]; then
        SUB_PACKAGE_MODIFIED=1
      fi
    done

    if [[ 0 == $SUB_PACKAGE_MODIFIED ]]; then
      echo "***************************************************************************************" >> "$OUTPUT_FILE"
      echo "*** No changes found [$SUB_PACKAGE_NAME]: $HOOK_FILE_ALIAS" >> "$OUTPUT_FILE"
      echo "***************************************************************************************" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"

      print_row_wait "[$HOOK_COMMAND, $EXECUTION_PATH] No changes found $SUB_PACKAGE_NAME"
      print_skip

      return
    fi
  fi

  if [[ ! -f "$HOOK_FILE_REAL" ]]; then
    echo "***************************************************************************************" >> "$OUTPUT_FILE"
    echo "*** Git-hook missing [$SUB_PACKAGE_NAME]: $HOOK_FILE_ALIAS" >> "$OUTPUT_FILE"
    echo "***************************************************************************************" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    print_row_wait "[$HOOK_COMMAND, $EXECUTION_PATH] Git-hook missing $SUB_PACKAGE_NAME"
    print_skip
  else
    echo "***************************************************************************************" >> "$OUTPUT_FILE"
    echo "*** Execute git-hook [$SUB_PACKAGE_NAME]: $HOOK_FILE_ALIAS" >> "$OUTPUT_FILE"
    echo "***************************************************************************************" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    set_title "[$HOOK_COMMAND, $EXECUTION_PATH] Execute git-hook $SUB_PACKAGE_NAME ..."
    print_row_wait "[$HOOK_COMMAND, $EXECUTION_PATH] Execute git-hook $SUB_PACKAGE_NAME"
    bash "$HOOK_FILE_REAL" $SUB_PACKAGE_NAME >> "$OUTPUT_FILE"
    EXIT_CODE=$?

    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    if [[ "true" == "$CONTINUE_ON_ERROR" ]]; then
      end_cmd $EXIT_CODE

      if [[ 0 != $EXIT_CODE ]]; then
        HAS_EXECUTION_ERROR=1
      fi
    else
      end_cmd_die $EXIT_CODE "Something is not perfect, please fix the issue(s) and then run command again.\n See output in $OUTPUT_FILE"
    fi
  fi
}

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

    if [[ "$SUB_PACKAGE" =~ "types" && "$SUB_PACKAGE" =~ "." ]]; then
      continue
    fi

    SUB_PACKAGE_NAME="$(echo "$SUB_PACKAGE" | sed "s|$ROOT_DIR/||")"

    # execute in root directory
    HOOK_FILE_REAL="$ROOT_DIR/$HOOK_PATH/$HOOK_COMMAND.sh"
    HOOK_FILE_ALIAS="$HOOK_PATH/$HOOK_COMMAND.sh"
    execute_git_hook_command "root script" "$HOOK_FILE_REAL" "$HOOK_FILE_ALIAS" "$SUB_PACKAGE_NAME"

    # execute in sub-package directory if exists
    HOOK_FILE_REAL="$SUB_PACKAGE/$HOOK_PATH/$HOOK_COMMAND.sh"
    HOOK_FILE_ALIAS="$PACKAGE/$(basename "$SUB_PACKAGE")/$HOOK_PATH/$HOOK_COMMAND.sh"
    if [[ "false" == "$IGNORE_MISSING_SUBPACKAGE" || -f "$HOOK_FILE_REAL" ]]; then
      execute_git_hook_command "sub-package" "$HOOK_FILE_REAL" "$HOOK_FILE_ALIAS" "$SUB_PACKAGE_NAME"
    fi
  done
done

echo ""

if [[ "true" == "$ADD_GIT_FILE" ]]; then
  git add .
fi

if [[ "true" == "$CONTINUE_ON_ERROR" && 1 == $HAS_EXECUTION_ERROR ]]; then
    echo ""
    echo -e " \033[0;33mYou have error during execution script, see output of command in log:\033[0m "
    echo -e " \033[0;33m  $OUTPUT_FILE\033[0m "
    echo ""
fi
