#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

npm run prettier-format
npm run lint-fix
npm run lint
