// 模态框切换
$(".toggle-Modal").on("click",function(e){
  //点在模态框上不用切换
  if($(this).hasClass('Modal-Background') && e.target != e.currentTarget){
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  $(".Modal-Background").toggleClass("is-Hidden");
  $('.tips').html('');
  e.preventDefault();
  e.stopPropagation();
  return false;
});
