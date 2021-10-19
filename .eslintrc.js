module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json"
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
    ],
    rules: {
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/explicit-function-return-type": ["error", {
            "allowExpressions": true
        }],
        quotes: ["error", "double"],
        "prettier/prettier": [
            "error",
            {
                singleQuote: false,
                tabWidth: 4,
                printWidth: 160,
                bracketSpacing: false,
            },
        ]
    },
};
