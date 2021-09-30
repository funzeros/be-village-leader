// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  projects: [
    {
      root: "./",
      // **optional** default: `[]`
      // Register globally Vue component glob.
      // If you set it, you can get completion by that components.
      // It is relative to root property.
      // Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
      globalComponents: [
        // './src/components/**/*.vue',
        // './src/views/Components/**/*.vue',
        // {
        // Component name
        // name: "IepEcharts",
        // Component file path, please use '/'.
        // path: "./src/components/IepCommon/ECharts.vue"
        // }
      ],

      snippetFolder: "./.vscode/vetur/snippets"
    }
  ]
};
