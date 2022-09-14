const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.query(
  `CREATE DATABASE IF NOT EXISTS MixyApp`,
  function (err, results) {
  }
);

connection.end();



const sequelize = require('./util/database');




//Quotes Section
const QuotesCategory = require('./models/Quotes Section/Qcategory');
const QuotesSubCategory = require('./models/Quotes Section/qsubcategory');
const Quote = require('./models/Quotes Section/quete');

//wallpaper
const WAcategory = require('./models/wallpaper/WAcategory');
const WASubCategory = require('./models/wallpaper/WAsubcategory');
const WAimage = require('./models/wallpaper/WAimage');


//facebook 
const Fcategory = require('./models/facebook/Fcategory');
const FSubCategory = require('./models/facebook/Fsubcategory');
const Fimage = require('./models/facebook/Fimage');


//WhatsaApp image
const ImageCategorie = require('./models/WhatsApp/image/ImageCategorie');
const ImageSubCategorie = require('./models/WhatsApp/image/ImageSubCategorie');
const WHimage = require('./models/WhatsApp/image/WHimage');



//WhatsaApp text

const TextCategory = require('./models/WhatsApp/text/TextCategory');
const TextSubCategory = require('./models/WhatsApp/text/TextSubCategory');
const Text = require('./models/WhatsApp/text/text');



//WhatsaApp video
const VideoCategories = require('./models/WhatsApp/video/VideoCategorie');
const VideoSubCategories = require('./models/WhatsApp/video/VideoSubCategorie');
const Video = require('./models/WhatsApp/video/video');



const app = express();



const adminRoutes = require('./routes/admin');
const categoryRoutes = require('./routes/category');
const subcategoryRoutes = require('./routes/subCategory');
const elementRoutes = require('./routes/element');
const errorRoutes = require('./routes/error');
const videoRoutes = require('./routes/video');


app.use(bodyParser.json()); // application/json
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/admin',adminRoutes);
app.use('/category',categoryRoutes);
app.use('/subcategory',subcategoryRoutes);
app.use('/element',elementRoutes)
app.use('/error',errorRoutes)
app.use('/video',videoRoutes)
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});


//Quotes Section
QuotesCategory.hasMany(QuotesSubCategory, { onDelete: 'cascade' });
QuotesSubCategory.belongsTo(QuotesCategory, { onDelete: 'cascade' });

QuotesSubCategory.hasMany(Quote, { onDelete: 'cascade' });
Quote.belongsTo(QuotesSubCategory, { onDelete: 'cascade' });


//facebook 
Fcategory.hasMany(FSubCategory, { onDelete: 'cascade' });
FSubCategory.belongsTo(Fcategory, { onDelete: 'cascade' });

FSubCategory.hasMany(Fimage, { onDelete: 'cascade' });
Fimage.belongsTo(FSubCategory, { onDelete: 'cascade' });


//wallpaper
WAcategory.hasMany(WASubCategory, { onDelete: 'cascade' });
WASubCategory.belongsTo(WAcategory, { onDelete: 'cascade' });

WASubCategory.hasMany(WAimage, { onDelete: 'cascade' });
WAimage.belongsTo(WASubCategory, { onDelete: 'cascade' });


//WhatsaApp image
ImageCategorie.hasMany(ImageSubCategorie, { onDelete: 'cascade' });
ImageSubCategorie.belongsTo(ImageCategorie, { onDelete: 'cascade' });

ImageSubCategorie.hasMany(WHimage, { onDelete: 'cascade' });
WHimage.belongsTo(ImageSubCategorie, { onDelete: 'cascade' });





//WhatsaApp text
TextCategory.hasMany(TextSubCategory, { onDelete: 'cascade' });
TextSubCategory.belongsTo(TextCategory, { onDelete: 'cascade' });

TextSubCategory.hasMany(Text, { onDelete: 'cascade' });
Text.belongsTo(TextSubCategory, { onDelete: 'cascade' });




//WhatsaApp video
VideoCategories.hasMany(VideoSubCategories, { onDelete: 'cascade' });
VideoSubCategories.belongsTo(VideoCategories, { onDelete: 'cascade' });

VideoSubCategories.hasMany(Video, { onDelete: 'cascade' });
Video.belongsTo(VideoSubCategories, { onDelete: 'cascade' });


sequelize
//.sync({ force: true })
.sync()
.then(result => {
app.listen(3000);
})
.catch(err => {
console.log(err);
});
