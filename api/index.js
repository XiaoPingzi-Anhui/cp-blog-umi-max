"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js
var require_utils = __commonJS({
  "node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var utils_exports = {};
    __export2(utils_exports, {
      esbuildIgnorePathPrefixPlugin: () => esbuildIgnorePathPrefixPlugin,
      matchApiRoute: () => matchApiRoute2
    });
    module2.exports = __toCommonJS2(utils_exports);
    function esbuildIgnorePathPrefixPlugin() {
      return {
        name: "ignore-path-prefix",
        setup(build) {
          build.onResolve({ filter: /^@fs/ }, (args) => ({
            path: args.path.replace(/^@fs/, "")
          }));
        }
      };
    }
    function matchApiRoute2(apiRoutes2, path) {
      if (path.startsWith("/"))
        path = path.substring(1);
      if (path.startsWith("api/"))
        path = path.substring(4);
      const pathSegments = path.split("/").filter((p) => p !== "");
      if (pathSegments.length === 0 || pathSegments.length === 1 && pathSegments[0] === "api") {
        const route2 = apiRoutes2.find((r) => r.path === "/");
        if (route2)
          return { route: route2, params: {} };
        else
          return void 0;
      }
      const params = {};
      const route = apiRoutes2.find((route2) => {
        const routePathSegments = route2.path.split("/").filter((p) => p !== "");
        if (routePathSegments.length !== pathSegments.length)
          return false;
        for (let i = 0; i < routePathSegments.length; i++) {
          const routePathSegment = routePathSegments[i];
          if (routePathSegment.match(/^\[.*]$/)) {
            params[routePathSegment.substring(1, routePathSegment.length - 1)] = pathSegments[i];
            if (i == routePathSegments.length - 1)
              return true;
            continue;
          }
          if (routePathSegment !== pathSegments[i])
            return false;
          if (i == routePathSegments.length - 1)
            return true;
        }
      });
      if (route)
        return { route, params };
    }
  }
});

// node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js
var require_request = __commonJS({
  "node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var request_exports = {};
    __export2(request_exports, {
      default: () => request_default,
      parseMultipart: () => parseMultipart,
      parseUrlEncoded: () => parseUrlEncoded
    });
    module2.exports = __toCommonJS2(request_exports);
    var import_utils = require_utils();
    var UmiApiRequest3 = class {
      constructor(req, apiRoutes2) {
        this._params = {};
        this._body = null;
        this._req = req;
        const m = (0, import_utils.matchApiRoute)(apiRoutes2, this.pathName || "");
        if (m)
          this._params = m.params;
      }
      get params() {
        return this._params;
      }
      get body() {
        return this._body;
      }
      get headers() {
        return this._req.headers;
      }
      get method() {
        return this._req.method;
      }
      get query() {
        var _a, _b;
        return ((_b = (_a = this._req.url) == null ? void 0 : _a.split("?")[1]) == null ? void 0 : _b.split("&").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          const k = acc[key];
          if (k) {
            if (k instanceof Array) {
              k.push(value);
            } else {
              acc[key] = [k, value];
            }
          } else {
            acc[key] = value;
          }
          return acc;
        }, {})) || {};
      }
      get cookies() {
        var _a;
        return (_a = this._req.headers.cookie) == null ? void 0 : _a.split(";").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          acc[key.trim()] = value;
          return acc;
        }, {});
      }
      get url() {
        return this._req.url;
      }
      get pathName() {
        var _a;
        return (_a = this._req.url) == null ? void 0 : _a.split("?")[0];
      }
      readBody() {
        if (this._req.headers["content-length"] === "0") {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          let body = [];
          this._req.on("data", (chunk) => {
            body.push(chunk);
          });
          this._req.on("end", () => {
            var _a, _b;
            const bodyBuffer = Buffer.concat(body);
            switch ((_a = this._req.headers["content-type"]) == null ? void 0 : _a.split(";")[0]) {
              case "application/json":
                try {
                  this._body = JSON.parse(bodyBuffer.toString());
                } catch (e) {
                  this._body = body;
                }
                break;
              case "multipart/form-data":
                const boundary = (_b = this.headers["content-type"]) == null ? void 0 : _b.split("boundary=")[1];
                if (!boundary) {
                  this._body = body;
                  break;
                }
                this._body = parseMultipart(bodyBuffer, boundary);
                break;
              case "application/x-www-form-urlencoded":
                this._body = parseUrlEncoded(bodyBuffer.toString());
                break;
              default:
                this._body = body;
                break;
            }
            resolve();
          });
          this._req.on("error", reject);
        });
      }
    };
    function parseMultipart(body, boundary) {
      const hexBoundary = Buffer.from(`--${boundary}`, "utf-8").toString("hex");
      return body.toString("hex").split(hexBoundary).reduce((acc, cur) => {
        var _a, _b;
        const [hexMeta, hexValue] = cur.split(
          Buffer.from("\r\n\r\n").toString("hex")
        );
        const meta = Buffer.from(hexMeta, "hex").toString("utf-8");
        const name = (_a = meta.split('name="')[1]) == null ? void 0 : _a.split('"')[0];
        if (!name)
          return acc;
        const fileName = (_b = meta.split('filename="')[1]) == null ? void 0 : _b.split('"')[0];
        if (fileName) {
          const fileBufferBeforeTrim = Buffer.from(hexValue, "hex");
          const fileBuffer = fileBufferBeforeTrim.slice(
            0,
            fileBufferBeforeTrim.byteLength - 2
          );
          const contentType = meta.split("Content-Type: ")[1];
          acc[name] = {
            fileName,
            data: fileBuffer,
            contentType
          };
          return acc;
        }
        const valueBufferBeforeTrim = Buffer.from(hexValue, "hex");
        const valueBuffer = valueBufferBeforeTrim.slice(
          0,
          valueBufferBeforeTrim.byteLength - 2
        );
        acc[name] = valueBuffer.toString("utf-8");
        return acc;
      }, {});
    }
    function parseUrlEncoded(body) {
      return body.split("&").reduce((acc, cur) => {
        const [key, value] = cur.split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
    }
    var request_default = UmiApiRequest3;
  }
});

// node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js
var require_response = __commonJS({
  "node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var response_exports = {};
    __export2(response_exports, {
      default: () => response_default
    });
    module2.exports = __toCommonJS2(response_exports);
    var UmiApiResponse3 = class {
      constructor(res) {
        this._res = res;
      }
      status(statusCode) {
        this._res.statusCode = statusCode;
        return this;
      }
      header(key, value) {
        this._res.setHeader(key, value);
        return this;
      }
      setCookie(key, value) {
        this._res.setHeader("Set-Cookie", `${key}=${value}; path=/`);
        return this;
      }
      end(data) {
        this._res.end(data);
        return this;
      }
      text(data) {
        this._res.setHeader("Content-Type", "text/plain; charset=utf-8");
        this._res.end(data);
        return this;
      }
      html(data) {
        this._res.setHeader("Content-Type", "text/html; charset=utf-8");
        this._res.end(data);
        return this;
      }
      json(data) {
        this._res.setHeader("Content-Type", "application/json");
        this._res.end(JSON.stringify(data));
        return this;
      }
    };
    var response_default = UmiApiResponse3;
  }
});

// node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js
var require_apiRoute = __commonJS({
  "node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js"(exports, module2) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var apiRoute_exports = {};
    __export2(apiRoute_exports, {
      UmiApiRequest: () => import_request.default,
      UmiApiResponse: () => import_response.default,
      matchApiRoute: () => import_utils.matchApiRoute
    });
    module2.exports = __toCommonJS2(apiRoute_exports);
    var import_request = __toESM2(require_request());
    var import_response = __toESM2(require_response());
    var import_utils = require_utils();
  }
});

// src/.umi/api/index.ts
var api_exports = {};
__export(api_exports, {
  default: () => api_default2
});
module.exports = __toCommonJS(api_exports);

// src/.umi/api/_middlewares.ts
var middlewares_default = async (req, res, next) => {
  next();
};

// src/api/index.ts
async function api_default(req, res) {
  res.status(200).json({
    posts_url: req.headers.host + "/api/articles",
    article_detail_url: req.headers.host + "/api/articles/{article_id}",
    users_url: req.headers.host + "/api/users",
    user_detail_url: req.headers.host + "/api/users/{user_id}"
  });
}

// src/.umi/api/index.ts
var import_apiRoute = __toESM(require_apiRoute());
var apiRoutes = [{ "path": "articles/[articlesId]", "id": "articles/[articlesId]", "file": "articles/[articlesId].ts", "absPath": "/articles/[articlesId]", "__content": "import { UmiApiRequest, UmiApiResponse } from '@umijs/max';\r\nimport { PrismaClient } from '@prisma/client';\r\n// import { Redis } from '@upstash/redis';\r\nimport { prismaErrorCatch } from '@/utils/jwt';\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case 'GET': {\r\n      /* const redis = Redis.fromEnv();\r\n      let article = await redis.get('article-' + req.params.articlesId);\r\n      if (article) {\r\n        res.status(200).json(article);\r\n        return;\r\n      } */\r\n      /* if (!article) { */\r\n      prismaErrorCatch(res, async (prisma: PrismaClient) => {\r\n        let article = await prisma.article.findUnique({\r\n          where: { articlesId: +req.params.articlesId },\r\n          include: { author: true },\r\n        });\r\n        if (article) res.status(200).json(article);\r\n        else res.status(404).json({ error: 'Article not found.' });\r\n        /* await redis.set(\r\n          `article-${req.params.articlesId}`,\r\n          JSON.stringify(article),\r\n        ); */\r\n      });\r\n      /* } */\r\n      break;\r\n    }\r\n    default:\r\n      res.status(405).json({\r\n        error: 'Method not allowed,Only the GET method is supported!',\r\n      });\r\n  }\r\n}\r\n" }, { "path": "articles", "id": "articles/index", "file": "articles/index.ts", "absPath": "/articles", "__content": "import { UmiApiRequest, UmiApiResponse } from '@umijs/max';\r\nimport { PrismaClient } from '@prisma/client';\r\nimport { verifyToken, prismaErrorCatch } from '@/utils/jwt';\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case 'GET':\r\n      prismaErrorCatch(res, async (prisma: PrismaClient) => {\r\n        const allArticles = await prisma.article.findMany({\r\n          include: { author: true },\r\n        });\r\n        if (allArticles) res.status(200).json(allArticles);\r\n        else res.status(404).json({ error: 'Article not found.' });\r\n      });\r\n      break;\r\n\r\n    case 'POST': {\r\n      if (!req.cookies?.token) {\r\n        return res.status(401).json({\r\n          message: 'Unauthorized',\r\n        });\r\n      }\r\n      const authorId = (await verifyToken(req.cookies.token)).id;\r\n      prismaErrorCatch(res, async (prisma: PrismaClient) => {\r\n        const { title, content, tags, categories } = req.body;\r\n        const newPost = await prisma.article.create({\r\n          data: {\r\n            title: title,\r\n            content: content,\r\n            createdAt: new Date(),\r\n            authorId,\r\n            tags: tags.join(','),\r\n            categories: categories.join(','),\r\n          },\r\n        });\r\n        res.status(200).json(newPost);\r\n      });\r\n\r\n      break;\r\n    }\r\n    default:\r\n      res.status(405).json({\r\n        error: 'Method not allowed,Only the GET/POST method is supported!',\r\n      });\r\n  }\r\n}\r\n" }, { "path": "users/[userId]", "id": "users/[userId]", "file": "users/[userId].ts", "absPath": "/users/[userId]", "__content": "import { UmiApiRequest, UmiApiResponse } from '@umijs/max';\r\nimport { PrismaClient } from '@prisma/client';\r\nimport { prismaErrorCatch } from '@/utils/jwt';\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case 'GET':\r\n      prismaErrorCatch(res, async (prisma: PrismaClient) => {\r\n        const user = await prisma.user.findUnique({\r\n          where: { userId: +req.params.userId },\r\n        });\r\n        if (user) res.status(200).json(user);\r\n        else res.status(404).json({ error: 'User not found.' });\r\n      });\r\n      break;\r\n    default:\r\n      res.status(405).json({\r\n        error: 'Method not allowed,Only the GET method is supported!',\r\n      });\r\n  }\r\n}\r\n" }, { "path": "users", "id": "users/index", "file": "users/index.ts", "absPath": "/users", "__content": "import { UmiApiRequest, UmiApiResponse } from '@umijs/max';\r\nimport { PrismaClient } from '@prisma/client';\r\nimport { prismaErrorCatch } from '@/utils/jwt';\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case 'GET':\r\n      prismaErrorCatch(res, async (prisma: PrismaClient) => {\r\n        const allUsers = await prisma.user.findMany({\r\n          select: {\r\n            userId: true,\r\n            username: true,\r\n            email: true,\r\n            passwordHash: false,\r\n          },\r\n        });\r\n        res.status(200).json(allUsers);\r\n      });\r\n      break;\r\n    default:\r\n      res.status(405).json({\r\n        error: 'Method not allowed,Only the GET method is supported!',\r\n      });\r\n  }\r\n}\r\n" }, { "path": "register", "id": "register", "file": "register.ts", "absPath": "/register", "__content": "import { UmiApiRequest, UmiApiResponse } from '@umijs/max';\r\nimport { PrismaClient } from '@prisma/client';\r\nimport { signToken, prismaErrorCatch } from '@/utils/jwt';\r\nimport { ACCESS_TOKEN } from '@/constants';\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case 'POST':\r\n      prismaErrorCatch(res, async (prisma: PrismaClient) => {\r\n        const {\r\n          email,\r\n          authority,\r\n          password,\r\n          username,\r\n          avatarUrl,\r\n          sex,\r\n          phoneNumber,\r\n        } = req.body;\r\n        const user = await prisma.user.create({\r\n          data: {\r\n            email,\r\n            authority,\r\n            passwordHash: password,\r\n            username,\r\n            sex,\r\n            phoneNumber,\r\n            avatarUrl,\r\n            likeArticlesId: '',\r\n          },\r\n        });\r\n        res\r\n          .status(201)\r\n          .setCookie(\r\n            ACCESS_TOKEN,\r\n            await signToken(user as unknown as API.UserInfo),\r\n          )\r\n          .json({ ...user, passwordHash: undefined });\r\n      });\r\n      break;\r\n    default:\r\n      res.status(405).json({\r\n        error: 'Method not allowed,Only the POST method is supported!',\r\n      });\r\n  }\r\n}\r\n" }, { "path": "/", "id": "index", "file": "index.ts", "absPath": "/", "__content": "import { UmiApiRequest, UmiApiResponse } from '@umijs/max';\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  res.status(200).json({\r\n    posts_url: req.headers.host + '/api/articles',\r\n    article_detail_url: req.headers.host + '/api/articles/{article_id}',\r\n    users_url: req.headers.host + '/api/users',\r\n    user_detail_url: req.headers.host + '/api/users/{user_id}',\r\n  });\r\n}\r\n" }, { "path": "login", "id": "login", "file": "login.ts", "absPath": "/login", "__content": "import { UmiApiRequest, UmiApiResponse } from '@umijs/max';\r\nimport { PrismaClient } from '@prisma/client';\r\nimport bcrypt from 'bcryptjs';\r\nimport { signToken, prismaErrorCatch } from '@/utils/jwt';\r\nimport { ACCESS_TOKEN } from '@/constants';\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case 'POST':\r\n      prismaErrorCatch(res, async (prisma: PrismaClient) => {\r\n        const user = await prisma.user.findUnique({\r\n          where: { email: req.body?.email },\r\n        });\r\n        if (\r\n          !user ||\r\n          !bcrypt.compareSync(req.body.password, user.passwordHash)\r\n        ) {\r\n          return res.status(401).json({\r\n            message: 'Invalid email or password!',\r\n          });\r\n        }\r\n        res\r\n          .status(200)\r\n          .setCookie(\r\n            ACCESS_TOKEN,\r\n            await signToken(user as unknown as API.UserInfo),\r\n          )\r\n          .json({ ...user, passwordHash: undefined });\r\n      });\r\n      break;\r\n    default:\r\n      res.status(405).json({\r\n        error: 'Method not allowed,Only the POST method is supported!',\r\n      });\r\n  }\r\n}\r\n" }];
var api_default2 = async (req, res) => {
  const umiReq = new import_apiRoute.UmiApiRequest(req, apiRoutes);
  await umiReq.readBody();
  const umiRes = new import_apiRoute.UmiApiResponse(res);
  await new Promise((resolve) => middlewares_default(umiReq, umiRes, resolve));
  await api_default(umiReq, umiRes);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
