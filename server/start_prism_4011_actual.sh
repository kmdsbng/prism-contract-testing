docker run --rm \
  -v ${PWD}/../reference:/local \
  -it \
  -p 4011:4011 \
  stoplight/prism:3 mock -p 4011 -h 0.0.0.0 /local/petstore-actual.oas3.yaml

