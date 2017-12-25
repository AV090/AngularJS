var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db=mongojs('people',['persondata']);
var app = express();
app.use(express.static(__dirname+"/static-file"));
app.use(bodyParser.json());
app.get('/persondata',function(req,res){
db.persondata.find(function (err,docs){
	
	res.json(docs);
})
});
app.post('/persondata',function(req,res){
	db.persondata.insert(req.body,function(err,doc){
		res.json(doc);
	})

});
app.delete('/persondata/:id',function(req,res){
	id = req.params.id;
db.persondata.remove({'_id':mongojs.ObjectId(id)},function(err,doc){
	console.log(doc);
	res.json(doc);
})
});
app.put('/persondata/:id',function(req,res){
id=req.params.id;
console.log("in server js"+id);
db.persondata.update({'_id':mongojs.ObjectId(id)},{$set:{'name':req.body.name,
	'lname':req.body.lname,'designation':req.body.designation}},function(err,doc){
	res.json(doc);
});
});
app.listen(3500);
console.log("server is ready");
 