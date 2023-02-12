const swaggerConfig = () => {
    const swagger = {
        exposeRoute: true,
        swagger: {
            info: {
                title: "Fastify-Api Documentation",
                description: "Implementing the concept of API documentation using Fastify, Swagger, and Node.js",
                version: "1.1.0"
            },
            tags: [
                {
                    name: 'User',
                    description: 'Operations related to User'
                }
            ],
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            schemes: ["http", "https"],
            consumes: ["application/json"],
            produces: ["application/json"]
        }
    }
    return swagger
}

module.exports = swaggerConfig