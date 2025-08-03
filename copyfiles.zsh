#!/bin/zsh

# Usage: ./copyfiles.zsh


# Copy the file
npm run build
cp -R ./dist/* /Users/vienpham/Chess/public
