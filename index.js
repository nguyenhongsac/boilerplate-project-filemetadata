var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer({ dest: '/public/' });
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(require('body-parser').urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

var uploadMiddleware = upload.fields([
  { name: 'upfile', maxCount: 1}
]);
app.post("/api/fileanalyse", uploadMiddleware, async function(req, res, next) {
  const upfile = req.files['upfile'][0];

  res.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
