var express = require('express');
var router = express.Router();

var lista = [];
/* GET users listing. */
router.get('/', function (req, res) {
  res.json(lista);
});

router.get('/:id', function (req, res) {
  let user = lista.find(f => f.id == req.params.id);
  if (user)
    res.json({ success: true, user });
  else
    res.json({ success: false, message: "cannot find user" });
});

router.post("/", function (req, res) {
  let params = req.query;
  if (params.Name && params.Email && params.Username) {
    params.id = lista.length + 1;
    lista.push(params);
    return res.json({ result: true });

  }
  else
    return res.json({ result: false, message: "params can't be null or whitespace" });

});
router.put("/:id", function (req, res) {
  let user = lista.filter(f => f.id == req.params.id)[0];
  if (user) {
    if (req.query.Name)
      user.Name = req.query.Name;
    if (req.query.Email)
      user.Email = req.query.Email;
    if (req.query.Username)
      user.Username = req.query.Username;
    return res.json({ success: true, message: "update success", user });
  }
  else
    return res.json({ success: false, message: "cannot find user" });
});

router.delete("/:id", function (req, res) {
  let user = lista.filter(f => f.id == req.params.id)[0];
  if (user) {
    lista = lista.filter(f => f.id != req.params.id);
    return res.json({ success: true, message: "user deleted!" });
  }
  else
    return res.json({ success: false, message: "cannot find user" });
});



module.exports = router;
