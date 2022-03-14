window.onload = () => {
  const body = document.body; // 获取body节点
  const canvas = document.createElement("canvas"); // 动态生成canvas标签
  canvas.id = "canvas";
  body.insertBefore(canvas, body.children[0]); // 插入body节点中

  const window_screen = window.screen;
  const w = (canvas.width = window_screen.width);
  const h = (canvas.height = window_screen.height);
  const fontSize = 12;
  const context = canvas.getContext("2d"); // 返回一个用于在画布上绘图的环境

  let col = 0; // 列数
  let drops = []; // 保存每一列当前的位置

  col = Math.floor(w / fontSize);

  for (let i = 0; i < col; i++) {
    drops.push(0);
  }

  var str = "qwertyuiopasdfghjklzxcvbnm0123456789"; //代码雨中的文字

  rain();

  function rain() {
    context.fillStyle = "rgba(0, 0, 0, .1)";
    context.fillRect(0, 0, w, h);
    context.fillStyle = "#00ff00"; // 先为要显示的文字设置好颜色

    for (let i = 0; i < col; i++) {
      const index = Math.floor(Math.random() * str.length);
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      context.fillText(str[index], x, y); // 把文字写到画布上去
      if (y >= canvas.height && Math.random() >= 0.99) {
        // 通过random()实现列与列位置的差别
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(rain, 30);
};
