var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
app.use(express.static('assets'));


var mongo = require('mongoose');
mongo.connect('mongodb://localhost:27017/image-test');

var schema = new mongo.Schema({
    item: String
});

var model1 = mongo.model('images', schema);

var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

var upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } });

app.post('/api/add_item', upload.single('image'), function (req, res, next) {
    let b= req.body.image;
    let a = b.split(',');
    //console.log(b)
    var raw = Buffer.from(a[1], 'base64').toString('binary');

    let pathF = './server/uploads/image-' + Date.now() + '.png';
    fs.writeFile(pathF, raw, 'binary',function (err) {
        if (err) return next(err)

        let db_data = {
            item: pathF
        };
    
        model1(db_data).save(function (err, data) {
            if (err) throw err
            res.json(data);
        })
    })
    
});

app.listen(4000);
console.log('Application listening on port 4000....');