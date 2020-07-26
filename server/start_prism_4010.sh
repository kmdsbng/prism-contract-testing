docker run --rm \
  -v ${PWD}:/local \
  -it \
  -p 4010:4010 \
  stoplight/prism:3 proxy -p 4010 -h 0.0.0.0 --errors petstore-expected.oas3.yaml http://localhost:4011
