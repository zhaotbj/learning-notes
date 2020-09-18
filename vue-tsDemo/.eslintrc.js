module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser', // 解析ts文件, 例如识别ts文件的内置类型
        ecmaFeatures: {
          legacyDecorators: true
        }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": 'off',
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }]
  }
  
}
