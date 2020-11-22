const Express = require('express');
const app = Express();
app.listen(3000, function() {
    console.log('BABYYYYY')
})
app.use('/test', function(req,res) {
    res.send("DATA BABY app.js")
  })