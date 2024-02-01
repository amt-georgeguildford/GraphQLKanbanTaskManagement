import {CodegenConfig} from "@graphql-codegen/cli"
export default {
    schema: "http://localhost:5000",
    documents: ["src/**/*.tsx"],
    generates: {
        "src/graphql/": {
            preset: "client",
            presetConfig: {
                gqlTagName: "gql",
            }

        }
    }
} satisfies CodegenConfig