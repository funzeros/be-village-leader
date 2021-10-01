const useConsole = function (colors: ConsoleColors) {
  return {
    color(msg: string, color: ColorsKey) {
      console.log(colors[color], msg);
    }
  };
};
const consoleColors = {
  bold: "\x1B[1m%s\x1B[22m",
  italic: "\x1B[3m%s\x1B[23m",
  underline: "\x1B[4m%s\x1B[24m",
  inverse: "\x1B[7m%s\x1B[27m",
  strikethrough: "\x1B[9m%s\x1B[29m",
  white: "\x1B[37m%s\x1B[39m",
  grey: "\x1B[90m%s\x1B[39m",
  black: "\x1B[30m%s\x1B[39m",
  blue: "\x1B[34m%s\x1B[39m",
  cyan: "\x1B[36m%s\x1B[39m",
  green: "\x1B[32m%s\x1B[39m",
  magenta: "\x1B[35m%s\x1B[39m",
  red: "\x1B[31m%s\x1B[39m",
  yellow: "\x1B[33m%s\x1B[39m",
  whiteBG: "\x1B[47m%s\x1B[49m",
  greyBG: "\x1B[49;5;8m%s\x1B[49m",
  blackBG: "\x1B[40m%s\x1B[49m",
  blueBG: "\x1B[44m%s\x1B[49m",
  cyanBG: "\x1B[46m%s\x1B[49m",
  greenBG: "\x1B[42m%s\x1B[49m",
  magentaBG: "\x1B[45m%s\x1B[49m",
  redBG: "\x1B[41m%s\x1B[49m",
  yellowBG: "\x1B[43m%s\x1B[49m"
};

type ColorsKey = keyof typeof consoleColors;
type ConsoleColors = {
  [key in ColorsKey]: string;
};

export default useConsole(consoleColors);
