window.onload = function () {
  let clzPjax = $(document).pjax('a[target!=_blank]', '#pageContent', { fragment: '#pageContent', timeout: 6000, scroll: false });
  clzPjax.on('pjax:complete', function () {
    // console.log(123)
    // $.getScript('//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js')
    // $.getScript('/libs/valine/av-min.js');
    // $.getScript('https://cdn.jsdelivr.net/gh/HCLonely/Valine@latest/dist/Valine.min.js');


    // $.getScript('/libs/tocbot/tocbot.min.js');
    // let temp = $.getScript('//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js');
    // console.log(temp);

  })

  clzPjax.on('pjax:send', function () {
    if ($('#toc-content').length) {
      tocbot.destroy()
    }
  })
}



// $(document).on('ready pjax:beforeReplace', async function (event) {
//   console.log(window.location.pathname);
//   valine.setPath(window.location.pathname);
// });
