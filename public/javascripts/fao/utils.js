/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

    fao.utils = {
      datestr2milliseconds : function(date_str){
//        alert(YAHOO.lang.isString(date_str));
//        alert(date_str);
        var ymd = /(\d{4})[^\d](\d{1,2})[^\d](\d{1,2})/;
        var result = date_str.match(ymd);
        if(!result){
          result = date_str.match(/(\d{4})(\d{2})(\d{2})/);
        }
        if(result){
            var date = new Date(result[1],result[2],result[3],1,1,1,1);
            return date.getTime();
        } else{
          return 32758707661001
        }
      },
      milliseconds2date : function(milliseconds){
        var ms = parseInt(milliseconds);
        if(isNaN(ms)){
          ms =  32758707661001;
        }
        var aDate = new Date(ms);
//        alert(YAHOO.lang.isNumber(milliseconds) + "" + YAHOO.lang.isString(milliseconds));
//        alert(aDate);
        return aDate;
      },
      milliseconds2age : function(nDatetimes){
          var date = new Date(nDatetimes);
          var thisyear = new Date();
          if(date.getFullYear() == 3008){
            return "";
          }else{
            return(thisyear.getFullYear() - date.getFullYear());
          }
      },
      date2str : function(oDate){
                   if(oDate.getFullYear() == 3008){
                     return "";
                   }else{
                     return oDate.getFullYear() + "-" + (oDate.getMonth()+1) + "-" + oDate.getDate();
                   }
                 },
      formatDate : function(elCell, oRecord, oColumn, oData){
          var mydate = oData;
            try{
              var y = mydate.getFullYear();
              var m = mydate.getMonth()+1;
              var d = mydate.getDate();
              m = m < 10 ? "0"+ m : m;
              d = d < 10 ? "0"+ d : d;
              if(y==3008){
                elCell.innerHTML = ""; 
              }else{
                elCell.innerHTML = y + "-" + m + "-" + d;
              }
            }catch(e){
              elCell.innerHTML = ""; 
            }
      },
      formatDeleteButton : function(el, oRecord, oColumn, oData) {
        el.innerHTML = "<button type=\"button\">删除</button>";
      },
      formatStaffsButton : function(el, oRecord, oColumn, oData) {
          el.innerHTML = "<button type=\"button\">人员</button>";
      },
      chDate : function(oDate){
          var date =oDate;
          var y = date.getFullYear();
          var m = date.getMonth()+1;
          var d = date.getDate();
          m = m < 10 ? "0"+ m : m;
          d = d < 10 ? "0"+ d : d;
          return(y + "年" + m + "月" + d + "日");
      }
    };

    fao.utils.ch2py = new function(){
      this.pya = [];  
      this.pyb = [];
      this.pyc = [];
      this.pyd = [];

      this.find_pinyin111= function(c){
        for(var i=0;i<pinyin_ary.length;i++){
          var py = pinyin_ary[i].split(",");
          if(py[0] == c){
            return py[1];
          }else{
            false;
          }
        }
      };
     this.find_pinyin = function(c){
       if(c.match(/^\w{1}$/)){
           return c;
       };
       var rs = fao.variables.db.execute("select pys from pys where hanzi=?",[c]);
       if(rs.isValidRow()){
         return rs.field(0);
       }else{
         return false;
       }
       if(rs)rs.close();
     }; 

      this.find_pystr = function(str){
        try{
          this.pya = [""];
          this.pyc = [""];
          for(var i=0;i<str.length;i++){
            var py = this.find_pinyin(str.charAt(i));
            if(py){
              var pys = py.split(/\s/);
              for(var j=0;j<pys.length;j++){
                for(var k=0;k<this.pya.length;k++){
                  this.pyb.push(this.pya[k] + pys[j]);
                  this.pyd.push(this.pyc[k] + pys[j].charAt(0));
                }
              }
              this.pya = this.pyb;
              this.pyc = this.pyd;
              this.pyb = [];
              this.pyd = [];
            }
          }
          return [this.pya,this.pyc];
        }catch(e){
          alert("from fao.utils.ch2py:" + e.message);
        }
      };
    };
