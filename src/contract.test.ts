import {getHttpOperationsFromResource, IHttpConfig,} from "@stoplight/prism-http";
import {createServer as createHttpServer} from "@stoplight/prism-http-server";
import {resolve} from "path";
import {IPrismHttpServer} from "@stoplight/prism-http-server/dist/types";
import Axios, {AxiosRequestConfig, Method} from "axios";
Axios.defaults.adapter = require('axios/lib/adapters/http');

import {IHttpOperation} from "@stoplight/types";
import {createLogger} from "@stoplight/prism-core";
import {inspect, InspectOptions} from "util";

const PORT = 4009;
const logger = createLogger("TEST", { enabled: false });

async function sendRequest(axiousRequest: AxiosRequestConfig) {
  return Axios(axiousRequest);
}

describe("API Contract Test for Server side", () => {
  const config = {
    cors: false,
    config: {
      mock: false,
      errors: false,
      checkSecurity: true,
      validateRequest: true,
      validateResponse: true,
      // upstream: new URL("http://httpbin"),
      // upstream: new URL("http://0.0.0.0:4011"),
      upstream: new URL("http://0.0.0.0:8080"),
    } as IHttpConfig,
    components: { logger },
  };
  let server: IPrismHttpServer;
  let operations: IHttpOperation[];

  beforeAll(async () => {
    // extract HTTP operations from the OAS file and convert them to an array of spec-agnostic objects
    operations = await getHttpOperationsFromResource(
      // resolve(__dirname, "api.oas2.yaml")
      resolve(__dirname, "../reference/petstore-expected.oas3.yaml")
    );
    // create a Prism server programmatically
    server = createHttpServer(operations, config);
    await server.listen(PORT, "localhost");
  });

  afterAll(async () => {
    await server.close();
  });

  test('test operations', () => {
    return Promise.all(operations.map(async operation => {
      let request: HttpRequest = operation2Request(operation);
      let axiousRequest: AxiosRequestConfig = request.toAxiousRequest();
      // console.log(axiousRequest);

      if (operation.iid == 'showPersonById') {
        const actualUrl: string = request.url.replace('{personId}', '1');
        axiousRequest = {
          url: actualUrl,
          method: request.method
        };
      }

      const response = await sendRequest(axiousRequest);
      if (response.headers['sl-violations'] != undefined) {
        // console.log(axiousRequest);
        const option: InspectOptions = {
            compact: true,
            colors: true
        };

        console.log(`${inspect(axiousRequest, option)}\nerror: ${inspect(response.headers['sl-violations'], option)}`);
      }
      expect(response.headers['sl-violations']).toBeUndefined();
    }))
  });
});

class HttpRequest {
  url: string;
  method: Method;

  constructor(url: string, method: Method) {
    [this.url, this.method] = [url, method];
  }

  toAxiousRequest = (): AxiosRequestConfig => {
    return {
      url: this.url,
      method: this.method
    }
  }
}

function operation2Request(operation: IHttpOperation): HttpRequest {

  const method = normalizeMethod(operation.method);
  return new HttpRequest(
    `http://localhost:${PORT}${operation.path}`,
    method
  );
}

function normalizeMethod(method: string): Method {
    // 型ガード(Type Guard)
    if (
        'get' == method || 'GET' == method ||
        'delete' == method || 'DELETE' == method ||
        'head' == method || 'HEAD' == method ||
        'options' == method || 'OPTIONS' == method ||
        'post' == method || 'POST' == method ||
        'put' == method || 'PUT' == method ||
        'patch' == method || 'PATCH' == method
    ) {
        return method;
    }

    throw `Invalid method value: ${method}`
}
