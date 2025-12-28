#!/bin/bash
# Bun wrapper script for running npm/bun commands
export PATH="$HOME/.bun/bin:$PATH"
bun "$@"
