// 代码块收缩

$(function () {
  var $code_expand = $('<i class="fas fa-angle-up code-expand" aria-hidden="true"></i>');

  $('.code-area').prepend($code_expand);
  $('.code-expand').on('click', function () {
    if ($(this).parent().hasClass('code-closed')) {
      $(this).siblings('pre').find('code').show();
      $(this).parent().removeClass('code-closed');
    } else {
      const codeWidth = $(this).parent().width();
      $(this).siblings('pre').find('code').hide();
      $(this).parent().width(codeWidth);
      $(this).parent().addClass('code-closed');
    }
  });
});