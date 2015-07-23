$("#login-form").submit(function(e){
  var userInfo = {
    username: filter.escape($('#username').val()),
    password: filter.escape($('#password').val())
  };

  $.post( '/login', userInfo,function( data ) {
    //失败
    if(data.status===-1){
      alert(data.msg);
    }
    //成功，种 cookie，跳转
    else if(data.status===1){
      setCookie('skey', data.skey, 1); // 设置 skey
      location.href = '/home';
    }
  });

  return false;
});
