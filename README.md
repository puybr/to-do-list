# ✅ To-Do List - [Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/todo-list)

[Link to project ...](https://puybr.github.io/to-do-list/)

My Data Structure is an array of objects `MyProjects`.

Links that I'm finding useful:
- [How to Get the Index of an Array that Contains Objects in JavaScript](https://www.w3docs.com/snippets/javascript/how-to-get-the-index-of-an-array-that-contains-objects-in-javascript.html)

`webpack.config.js` File

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

```

## 🚀 CI/CD
* [CICD workflow](/.github/workflows/cicd.yml) with GitHub Actions

- - -

🧣 Bundled with _[webpack!](https://webpack.js.org/)_ | Styled with _[tailwindcss](https://tailwindcss.com/)_