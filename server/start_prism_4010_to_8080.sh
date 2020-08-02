docker run --rm \
  -v ${PWD}/../reference:/local \
  -it \
  -p 4010:4010 \
  stoplight/prism:3 proxy -p 4010 -h 0.0.0.0 /local/petstore-expected.oas3.yaml http://localhost:8080

