let blogId = decodeURI(location.pathname.split("/").pop()); //access the blog ID from url
// use decodeURL so you wil get a decoded URL

let docRef = db.collection("blogs").doc(blogId); //this way we fetch the specific document from firebase, i.e by blogID

docRef.get().then((doc) => {
    if(doc.exists){// if doc exists
        console.log(doc.data()); //just to see the data with blogId on rtclick inspect console
        setupBlog(doc.data());
    } else{ //if the document not exists then replace the loaction to homeroute "/"
        location.replace("/");
    }
})

const setupBlog = (data) => {
    //select all the elements here
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    
    banner.style.backgroundImage = `url(${data.bannerImage})`;//i.e will upload the background image jo dala publish karte vakt and 

    titleTag.innerHTML += blogTitle.innerHTML = data.title;//will fetch from firebase database set the title of the page
    publish.innerHTML += data.publishedAt;//will fetch the publish date from firebase database and show

     const article = document.querySelector('.article'); //now we have to format the article for that create another function ........STARTED from here
     addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);//split the article with /n
    // console.log(data); //shows that blog info on rt click inspect
 
    //now we can access individual blogs

    //use a foreach to loop through data
    data.forEach(item => {

        // check for heading
        if(item[0] == '#'){  //i.e if we found any "#" at start we will go insode this condition
            let hCount = 0; //hCount will track how many # are there
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            //once we gott how many "#" are present in the start we can define the heading tag.
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`  //and at last insert this tag inside the article element
        } 

        //heading and paragraphs are done so do for image now.
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator; //this variable will store index of "]" from the text

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){  //this condition check for "]","(" and ")"
                    seperator = i;
                }
            }

            //this will extract image's "alt" and "src"
            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;

            //now style those images using classes
        }

        else{  //and else where we make a "p" element
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}