#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

npm run lint && npm run prettier-format
