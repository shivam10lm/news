const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "News App API",
      version: "1.0.0",
      description: "Simple News Application API",
    },
    paths: {
      "/api/news/search": {
        get: {
          tags: ["News"],
          summary: "Search news articles",
          parameters: [
            {
              in: "query",
              name: "q",
              schema: { type: "string" },
              description: "Search query",
            },
          ],
          responses: {
            200: {
              description: "List of news articles",
            },
          },
        },
      },

      "/api/favorites": {
        get: {
          tags: ["Favorites"],
          summary: "Get all favorites",
          responses: {
            200: {
              description: "List of favorite articles",
            },
          },
        },
        post: {
          tags: ["Favorites"],
          summary: "Add to favorites",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    url: { type: "string" },
                    urlToImage: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Article added to favorites",
            },
          },
        },
      },
      "/api/favorites/{id}": {
        delete: {
          tags: ["Favorites"],
          summary: "Remove from favorites",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            204: {
              description: "Article removed",
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
