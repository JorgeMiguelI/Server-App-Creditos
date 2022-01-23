const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(require('./routes/routes'));


app.listen(app.get('port'), ()=>{
    console.log("Servdidor corriendo en el puerto "+ app.get('port'));
})