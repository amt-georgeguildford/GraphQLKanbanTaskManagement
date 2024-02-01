import {CodegenConfig} from "@graphql-codegen/cli"
export default {
    schema: "./src/graphql/schema.graphql", 
    hooks: {
        afterAllFileWrite: ['npx prettier --write']
    },
    generates: {
        "./src/graphql/graphql-types.ts": {
            plugins: ["typescript", "typescript-resolvers"]
        }
    }
} satisfies CodegenConfig