#!/usr/env/bin bash
cd "$(dirname "$0")" || exit 1

rm -rf node_modules/sharp

SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install \
    --arch=x64 \
    --platform=linux \
    --libc=glibc \
    --target=16.16.0 \
    sharp
