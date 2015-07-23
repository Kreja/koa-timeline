$(function() {
  'use strict';
  var app = {
    /**
     * 启动
     * @return {[type]} [description]
     */
    init: function(){
      var me = this;
      me.getInitData();

      //添加新内容
      $('.btn-send').on('click',function(e){
        //校验
        if(!$('#title').val() || !$('#txt').val()){
          $('.tips').html('标题和内容必填~');
          return;
        }

        var newCom = {
          date: new Date(),
          title: filter.escape($('#title').val()),
          txt: filter.escape($('#txt').val()),
          g_tk: getCookie('skey') // 带上 g_tk
        };

        //请求
        $.post( '/add', newCom, function( data ) {
          //失败
          if(data.status===-1){
            alert(data.msg);
          }
          //成功
          else if(data.status===1){
            me.afterAdd(data.newCom);
          }
        });
      });
    },
    /**
     * 获得初始数据
     * @return {[type]} [description]
     */
    getInitData: function(){
      var newBlock = '';

      $.get( '/getInitData', function( data ) {
        //失败
        if(data.status===-1){
          alert(data.msg);
        }
        //成功,显示初始评论
        else if(data.status===1){
          for(var i = data.comments.length - 1; i >= 0; i--){
            newBlock += '<div class="cd-timeline-block fadein">' +
                          '<div class="cd-timeline-img cd-picture"></div>' +
                          '<div class="cd-timeline-content">' +
                            '<h2>' + data.comments[i].title + '</h2>' +
                            '<p>' + data.comments[i].txt + '</p>' +
                            '<span class="cd-date">' + data.comments[i].date + '</span>' +
                          '</div>' +
                        '</div>';
          }
          $(newBlock).insertAfter('.cd-add');
        }
      });
    },
    /**
     * 添加成功后执行
     * @param  {[type]} newCom [description]
     * @return {[type]}        [description]
     */
    afterAdd: function(newCom){
      //自动关闭
      $('.Modal-Background').toggleClass('is-Hidden');
      //插入最新的
      var newBlock = '<div class="cd-timeline-block fadein">' +
                        '<div class="cd-timeline-img cd-picture"></div>' +
                        '<div class="cd-timeline-content">' +
                          '<h2>' + newCom.title + '</h2>' +
                          '<p>' + newCom.txt + '</p>' +
                          '<span class="cd-date">' + newCom.date + '</span>' +
                        '</div>' +
                      '</div>';
      $(newBlock).insertAfter('.cd-add');
      //清除已填的内容
      $('#title').val('');
      $('#txt').val('');
    }
  };

  app.init();
});
