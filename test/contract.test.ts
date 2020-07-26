import {
  getHttpOperationsFromResource,
  IHttpConfig,
} from "@stoplight/prism-http";
import { createServer as createHttpServer } from "@stoplight/prism-http-server";
import { resolve } from "path";
import { IPrismHttpServer } from "@stoplight/prism-http-server/dist/types";
import Axios, {AxiosRequestConfig, Method} from "axios";
import { IHttpOperation } from "@stoplight/types";
import { createLogger } from "@stoplight/prism-core";

const PORT = 4009;
const logger = createLogger("TEST", { enabled: false });

async function sendRequest(axiousRequest: AxiosRequestConfig) {
  console.log(axiousRequest);
  const response = await Axios(axiousRequest);
  return response;
}

describe("API Contract Test", () => {
  const config = {
    cors: false,
    config: {
      mock: false,
      errors: false,
      checkSecurity: true,
      validateRequest: true,
      validateResponse: true,
      // upstream: new URL("http://httpbin"),
      upstream: new URL("http://0.0.0.0:4011"),
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

  // test("test operations", () => {
  //   // for each operation defined in the OAS file
  //   return Promise.all(
  //     operations.map(async (operation) => {
  //       // dummy convertion from the IHttpOperation to an Axios request
  //       const request = operation2Request(operation);
  //       // make a request to the Prism server
  //       const response = await axios(request);

  //       // Note: these are vialations provided by Prism
  //       // In order to assure you meet the contract
  //       // you should expect vialotions to be undefined.
  //       expect(JSON.parse(response.headers["sl-violations"])).toEqual([
  //         {
  //           location: ["response", "body"],
  //           severity: "Error",
  //           code: "required",
  //           message: "should have required property 'title'",
  //         },
  //         {
  //           location: ["response", "body"],
  //           severity: "Error",
  //           code: "required",
  //           message: "should have required property 'description'",
  //         },
  //       ]);
  //     })
  //   );
  // });

  test('test operations', () => {
    return Promise.all(operations.map(async operation => {
      let request: HttpRequest = operation2Request(operation);

      if (operation.iid == 'showPersonById') {

        const actualUrl: string = request.url.replace('{personId}', '1')
        const axiousRequest: AxiosRequestConfig = {
          url: actualUrl,
          method: request.method
        };
        const response = await sendRequest(axiousRequest);

        expect(response.headers['sl-violations']).toBeUndefined();

      } else {
        const axiousRequest = request.toAxiousRequest();
        const response = await sendRequest(axiousRequest);
        expect(response.headers['sl-violations']).toBeUndefined();

      }



      // console.log("--- operation:")
      // console.log(operation)
      // console.log("--- request:")
      // console.log(request)
    }))
  });

  afterEach(async () => {
    await server.close();
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

  const method = normalizeMethod(operation.method)
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
