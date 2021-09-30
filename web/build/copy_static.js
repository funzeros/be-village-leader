/* eslint-disable @typescript-eslint/no-var-requires */
const { sync } = require("copy-dir");
sync(
  process.cwd() + "/dist/index.html",
  process.cwd() + "/dist/404.html",
  {
    utimes: true,
    mode: true,
    cover: true
  },
  function (err) {
    if (err) throw err;
    console.log("copy done");
  }
);
