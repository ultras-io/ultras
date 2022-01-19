#!/usr/bin/env bash
cd "$(dirname "$0")/../../$1" || exit 1

npm --silent run prettier-format
if [[ $? != 0 ]]; then
  exit 2
fi

npm --silent run lint-fix
if [[ $? != 0 ]]; then
  exit 5
fi

npm --silent run lint
if [[ $? != 0 ]]; then
  exit 4
fi
