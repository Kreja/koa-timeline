/**
 * 删除
 * @param  {Object} e){               if(!confirm("确定要删除吗？")) return;  var param [description]
 * @return {[type]}      [description]
 */
$(".J-delete").on("click",function(e){
  if(!confirm("确定要删除吗？")) return;
  var param = {id:$(this).attr('data-id')};

  //请求
  $.post( '/timeline/del', param, function( data ) {
    //失败
    if(data.status===-1){
      alert(data.msg);
    }
    //成功
    else if(data.status===1){
      //应该用返回的 newMsg
      afterDelete();
    }
  });
});

/**
 * 删除成功之后执行
 * @return {[type]} [description]
 */
function afterDelete(){
  alert('删除成功！')
  location.href = '/timeline';
}

/**
 * 编辑
 * @param  {Object} e){                 if(!$('#title').val() || !$('#txt').val()){    $('.tips').html('标题和内容必填~');    return;  }  var newMsg [description]
 * @return {[type]}      [description]
 */
$(".btn-send").on("click",function(e){
  //校验
  if(!$('#title').val() || !$('#txt').val()){
    $('.tips').html('标题和内容必填~');
    return;
  }

  var editedMsg = {
    id:$('#title').attr('data-id'),
    title: $('#title').val(),
    txt: $('#txt').val()
  };

  //请求
  $.post( '/timeline/edit', editedMsg, function( data ) {
    //失败
    if(data.status===-1){
      alert(data.msg);
    }
    //成功
    else if(data.status===1){
      afterEdit(data.editedMsg);
    }
  });
});

/**
 * 添加成功之后执行
 * @return {[type]} [description]
 */
function afterEdit(editedMsg){
  //自动关闭
  $(".Modal-Background").toggleClass("is-Hidden");

  //更新标题、内容
  $('.J-title').html(editedMsg.title);
  $('.J-txt').html(editedMsg.txt);
  $('#title').val(editedMsg.title);
  $('#txt').val(editedMsg.txt);
}
