window.onload = function () {
  let clzPjax = $(document).pjax('a[target!=_blank]', '#pageContent', { fragment: '#pageContent', timeout: 6000, scroll: false });
  clzPjax.on('pjax:complete', function () {
    console.warn(123)
    if ($('#toc-content').length) {
      tocbot.destroy()
    }
  })
}


