#!/bin/bash

pnpx prisma migrate deploy
node dist/index.js
