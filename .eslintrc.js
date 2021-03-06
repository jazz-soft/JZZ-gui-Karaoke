module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended", 
  "parserOptions": {
    "ecmaVersion": 5
  },
  "overrides": [
    {
      "files": ["test/*"],
      "globals": {
        "before": "readonly",
        "after": "readonly",
        "describe": "readonly",
        "it": "readonly"
      },
      "rules": {
        "no-console" : "off"
      }
    },
    {
      "files": ["javascript/*"],
      "globals": {
        "JZZ": "readonly",
        "define": "readonly"
      },
      "rules": {
        "no-empty" : ["warn", { "allowEmptyCatch": true }]
      }
    }
  ]
};