function pad_dots() {
  local MESSAGE="$1"

  local LENGTH_MSG=${#MESSAGE}
  local LENGTH_DOT=$(( 70 - $LENGTH_MSG ))
  
  for INDEX in `seq $LENGTH_DOT`; do
    echo -en "."
  done
}

function print_row_wait() {
  local MESSAGE="$1"
  local DOTS="$2"

  local DOTS="$(pad_dots "$MESSAGE")"

  echo -en " \033[1;34m* $MESSAGE\033[0m $DOTS "
  echo -en "\033[0;100;5m WAIT \033[0m "
}

function print_done() {
  echo -e "\b\b\b\b\b\b\b\033[0;42m DONE \033[0m"
}

function print_fail() {
  echo -e "\b\b\b\b\b\b\b\033[0;41m FAIL \033[0m"
}

function print_skip() {
  echo -e "\b\b\b\b\b\b\b\033[0;43m SKIP \033[0m"
}

function end_cmd_die() {
  local EXIT_CODE=$1
  local ERROR_MSG="$2"

  if [[ 0 == $EXIT_CODE ]]; then
    print_done
  else
    print_fail
    echo ""
    echo -e " 😱 \033[0;31mOh-no. $ERROR_MSG\033[0m 💀"
    echo ""

    exit 1
  fi
}

function end_cmd() {
  local EXIT_CODE=$1

  if [[ 0 == $EXIT_CODE ]]; then
    print_done
  else
    print_fail
  fi
}
