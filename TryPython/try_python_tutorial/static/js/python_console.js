var multiple_statements = "";

ajax.initAjax($);

var get_last_statement = function(line){
    var splited_line = line.split("\n");
    return splited_line[splited_line.length -1];  
};

$(document).ready(function(){
         
var console_ = $('<div class="console">');
$('body').append(console_);
var controller2 = console_.console({
 promptLabel: '>>> ',
 continuedPromptLabel: '...\t',
 commandValidate:function(line){
    return true;
 },
 commandHandle:function(line, report){
   
    if (controller2.continuedPrompt){
        var last_statement = get_last_statement(line);
        if (last_statement.trim()){
            if (!last_statement.endsWith(":")){
                multiple_statements += '\n\t' + last_statement;
            }else if(last_statement.endsWith(":")){
                multiple_statements += '\n' + last_statement;
            }
            return;
        }

    }
    if (line.endsWith(":")){
      controller2.continuedPrompt = true;
      multiple_statements += get_last_statement(line);
      return;
    }else{
      controller2.continuedPrompt = false;
    }
     if (multiple_statements){
        line = multiple_statements + '\n';
        multiple_statements = "";
     }

     ajax.ajax($, "/eval", {toEval: line}, function(result){
        var msgs = [];
          var out = result.out;
          var err = result.err;
          console.log("out: " + out);
          console.log("error: " + err);
          
          if (out.trim()){
            out = out.split("\n");
            for (var l in out){
              line_out = out[l];
              if (line_out.trim()){  
                msgs.push({msg:" " + line_out,
                          className: "jquery-console-message-value"
                          });
              }
            }
            report(msgs);
          }else{
            report([
              {msg: err,className: "jquery-console-error"}
              ]);
            return;
          }
     });
 },
 welcomeMessage: 'Welcome to python interactive web console.',
 autofocus: true
});
});