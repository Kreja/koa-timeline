/**
 * type标识请求的方式，j132标识jquery，j126标识base，lk标识普通链接,fr标识form表单
 * @param {[type]} url  [description]
 * @param {[type]} type [description]
 */
function setCookie(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : "; expires="+exdate.toGMTString());
}

function addToken(url,type){
    var token=getToken();
    return token==""?url:url+(url.indexOf("?")!=-1?"&":"?")+"g_tk="+token+"&g_ty="+type;
}

function getToken(){
    var skey=getCookie("skey"),
        token=skey==null?"":time33(skey);
    return token;
}

function getCookie(name){
    //读取COOKIE
    var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"),
        val=document.cookie.match(reg);//如果获取不到会提示null
    return val?unescape(val[2]):null;
};

function time33(str){
  str = typeof str == 'string' ? str : str.toString();

  //哈希time33算法
  for(var i = 0, len = str.length,hash = 5381; i < len; ++i){
     hash += (hash << 5) + str.charAt(i).charCodeAt();
  };

  return hash & 0x7fffffff;
};
