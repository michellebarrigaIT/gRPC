#!/bin/bash

OUT_DIR=./dist

mkdir -p $OUT_DIR

protoc \
  --plugin=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=$OUT_DIR \
  --ts_proto_opt=outputServices=grpc-js \
  --ts_proto_opt=esModuleInterop=true \
  -I=./protos \
  ./protos/*.proto
