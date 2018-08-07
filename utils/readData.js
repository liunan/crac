var fs = require("fs");
var readline = require('readline');


var fRead = fs.createReadStream('./dataA.txt');


var objReadline = readline.createInterface({  
    input: fRead,  
// 这是另一种复制方式，这样on('line')里就不必再调用fWrite.write(line)，当只是纯粹复制文件时推荐使用  
// 但文件末尾会多算一次index计数   sodino.com  
//  output: fWrite,   
//  terminal: true  
});  
  
//var repo ={};  
var repo = [];
var question=null;
var idx;
var index = 1;  
objReadline.on('line', (line)=>{  
    var tmp = 'line' + index.toString() + ':' + line;  
    
    if(line!='')
    {
        switch(line.charAt(1))
        {
            case 'I':
                if(idx)
                {                    
                    //repo[idx] = question;//push to repo
		    repo.push(question);
                }
                idx = line.substr(3);
                break;
            case 'Q':                
                question={};//new question obj
                var q = line.substr(3);
                question["Q"] = q;                                                
                break;
            case 'A':
            case 'B':
            case 'C':
            case 'D':
                if(question.C==null)
                {
                    question.C=[];//make choice array
                }
                question.C.push(line.substr(3));
                break;
            case 'P':
            case 'I':
                break;//ignore just now
            default:
                console.log('unkonw instruction '+ line)
                break;
        }
        
    }   
});  
  
objReadline.on('close', ()=>{  
    console.log('readline close...');
    let txtout = JSON.stringify(repo); 
    

    fs.writeFileSync('./repoA.json',txtout);
});  
