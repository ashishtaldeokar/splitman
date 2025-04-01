#!/bin/bash

pnpm exec prisma migrate deploy
node dist/index.js
