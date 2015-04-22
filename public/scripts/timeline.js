$(function() {
  init();

  /**
   * 初始化
   * @return {[type]} [description]
   */
  function init(){
    //添加新内容
    $(".btn-send").on("click",function(e){
      //校验
      if(!$('#title').val() || !$('#txt').val()){
        $('.tips').html('标题和内容必填~');
        return;
      }

      var newMsg = {
        date: new Date(),
        title: $('#title').val(),
        txt: $('#txt').val()
      };

      //请求
      $.post( '/timeline', newMsg, function( data ) {
        //失败
        if(data.status===-1){
          alert(data.msg);
        }
        //成功
        else if(data.status===1){
          afterAdd(data.newMsg);
        }
      });
    });
  }

  /**
   * 添加成功之后执行
   * @return {[type]} [description]
   */
  function afterAdd(newMsg){
    //自动关闭
    $(".Modal-Background").toggleClass("is-Hidden");
    //插入最新的
    var newBlock = '\
        <div class="cd-timeline-block fadein">\
          <div class="cd-timeline-img cd-picture"></div>\
          <div class="cd-timeline-content">\
            <h2>' + newMsg.title + '</h2>\
            <p>' + newMsg.txt + '</p>\
            <a href="timeline/' + newMsg._id.toString() + '" class="cd-read-more">Read more</a>\
            <span class="cd-date">' + newMsg.date + '</span>\
          </div>\
        </div>';
    $(newBlock).insertAfter('.cd-add');
    //清除已填的内容
    $('#title').val('');
    $('#txt').val('');
  }
});
