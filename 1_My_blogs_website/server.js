

const express= require('express');
const cors = require('cors');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path= path.join(__dirname,"public");

const app = express();
app.use(cors());

app.use(express.static(initial_path));
app.use(fileupload());


app.get('/',(req,res) => {
    res.sendFile(path.join(initial_path,"home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

// upload link
// try
// {
//     app.post('/upload', (req, res) => {
//     let file = req.files.image;
//     let date = new Date();
//     // image name
//     let imagename = date.getDate() + date.getTime() + file.name;
//     // image upload path
//     let path = 'public/uploads/' + imagename;

//     // create upload
//     file.mv(path, (err, result) => {
//         if(err){
           
//             throw err;
//         } else{
//             // our image upload path
//             res.json(`uploads/${imagename}`) //in response send uploaded image path
//         }
//     })
// })
app.get('/upload', (req, res) =>{
    res.json("Get method")
})
app.post('/upload', (req, res) => {
   // console.log("hieeeee");
    let file = req.files.image;
  //  console.log(file);
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            console.log("sending response",imagename);
            // our image upload path
            res.json(`uploads/${imagename}`)
           //return res.status(200).send({urlpath:`uploads/${imagename}`})
        }
    })
   // res.json("Helloo");
})

// }catch(error){
//     alert("upload Image only");
//     console.error(error);
// }


//making blog route
app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

//making 404 route
app.use((req, res) => {
    res.json("404");
})
//again go to server.js and made blog route and 404 route

app.listen("4000",() => {
    console.log('listening......');
   
})
