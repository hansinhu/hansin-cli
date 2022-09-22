import readline from "readline";

class Progress {
  timer = null as any;
  count = 0;
  maxCount = 20;
  constructor() {
    // this.rl = readline.createInterface({
    // 	input: process.stdin,
    // 	output: process.stdout
    // });
  }

  start = () => {
    this.rest();
    const stdout = process.stdout;
    const bgColor = "\u001b[42;1m";
    const textColor = "\u001b[31;1m";
    this.timer = setInterval(() => {
      readline.clearLine(stdout, 0); // 广播
      readline.cursorTo(stdout, 0);
      const bar = "".padEnd(this.count, " ");
      const percent = `${Math.floor((this.count * 100) / 20)}%`;
      let text = `${bgColor}${textColor}${percent}${bar}\u001b[0m`; // \u001b[0m 是清除之前的操作
      stdout.write(text);
      this.count++;
      if (this.count > 20) {
        this.count = 1;
      }
    }, 300);
  };
  rest = () => {
    if (this.timer) clearInterval(this.timer);
    this.count = 0;
  };
  end = () => {
    this.rest();
  };
}

export default Progress;
