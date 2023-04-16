const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})

// const uploadImage = (uploadFile, uploadType) => {
//     console.log(uploadFile.files);/////
//     const [file] = uploadFile.files;  //access files from upload.files

//     if (file && file.type.includes("image")) {  //this condition will make sure that the uploaded file is image only
//         alert("upload Image only....");
//         const formdata = new FormData(); //create a formdata before making request
//         formdata.append('image', file); //now append our file to formdata, 'image'<-- this should be same as the one mentioned in the server.js => i.e let file = req.files.image;
//         console.log(formdata);
//         //now make post request to '/upload' route using fetch method
//         // try
//         // {

//         fetch('/upload', {
//             method: 'post',
//             body: formdata
//         }).then(function(res){
//             console.log(response);
//             return res.json();
//         })//.then(res => res.json())
//             .then(data => {     //here once you got the image url set banner's background image
//                 if (uploadType == "image") {
//                     addImage(data, file.name);
//                 } else {
//                     bannerPath = `${location.origin}/${data}`;
//                     banner.style.backgroundImage = `url("${bannerPath}")`;
//                 }
//             })
//         // }catch(error){
//         //     alert("upload Image only");
//         //     console.error(error);
//         // }

//     } else {
//         alert("upload Image only");
//     }
// }



// const uploadImage = (uploadFile, uploadType) => {
//     const [file] = uploadFile.files;
//     if (file && file.type.includes("image")) {
//         const formdata = new FormData();
//         formdata.append('image', file);

//         fetch('http://localhost:4000/upload', {
//             method: 'post',
//             body: formdata
//         })
//         .then(res => {
//             //res.json("fetchh")
//             console.log(res);
//         })
//             .then(data => {
//                 console.log("Comment.apply.apply.........");
//                 if (uploadType == "image") {
//                     addImage(data, file.name);

//                     console.log("new cmtt")
//                 }
//                 else{
//                     bannerPath = `${location.origin}/${data}`;
//                     banner.style.backgroundImage = `url("${bannerPath}")`;
//                     console.log(banner);
//                 }
//             })
//     } else {
//         alert("upload Image only");
//     }
// }

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => {
            console.log("res -- newww",res)
            return res.json() //return nai likha tha, that is why problem hua
            
        })
        .then(data => {
            console.log("data",data);
            if(uploadType == "image"){
                console.log("uploadTpye");
                addImage(data, file.name);
            } else{ //for banner
                console.log("bannerpath");
                bannerPath = `${location.origin}/${data}`;
                console.log(bannerPath);
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("upload Image only");
    }
}



const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart; //selectionSTart will gice cursor position so that we can add image text to it
    let textToInsert = `\r![${alt}](${imagepath})\r`; //our image inside aarticle will be in this format
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos); // use slice() to slice its value to insert the image exactly at the cursor point
}


//creating months array
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', () => {
    if(articleFeild.value.length && blogTitleField.value.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-"); //here replace all the spaces with '-' in the title
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`; //now define the docName which we need for the database
        let date = new Date(); //  'date' for storing published time i.e published at info

        //access firstore with db variable; //so yaha cloud firebase console pe "blogs" <- ye collection banaya, and then write niche ka code
        db.collection("blogs").doc(docName).set({ //make "blogs" collection the database
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() => {
            location.href = `/${docName}`; //now instead console, redirect user to the blog page
            //console.log('date entered');
            console.log(docName);
        })
        .catch((err) => {
            console.error(err);
        })
    }
})