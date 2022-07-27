// import { db } from './firebase';

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// EVENT LISTENERS

bannerImage.addEventListener('change', () => {
  uploadImage(bannerImage, 'banner');
});

uploadInput.addEventListener('change', () => {
  uploadImage(uploadInput, 'image');
});

publishBtn.addEventListener('click', () => {
  console.log(articleField.value.length, blogTitleField.value.length);
  if (articleField.value.length && blogTitleField.value.length) {
    console.log('running main function');
    // generating id
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    // replace all spaces in the title with a dash
    let blogTitle = blogTitleField.value.split(' ').join('-');
    let id = '';
    for (let i = 0; i < 4; i++) {
      id += letters[Math.floor(Math.random() * letters.length)];
    }

    // setting up docName
    let docName = `${blogTitle}-${id}`;
    let date = new Date(); //for published at info

    // access firestore with db variable
    db.collection('blogs')
      .doc(docName)
      .set({
        title: blogTitleField.value,
        article: articleField.value,
        bannerImage: bannerPath,
        publishedAt: `${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`,
      })
      .then(() => {
        // redirect
        location.href = `/${docName}`;
      })
      .catch((err) => console.log(error(err)));
  }
});

// FUNCTIONS

// Image Upload Function
const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  // verify that uploaded file is an image
  if (file && file.type.includes('image')) {
    // create formdata before making request
    const formData = new FormData();
    // append file to created formdata
    formData.append('image', file);

    // make post request to upload route using fetch
    fetch('/upload', {
      method: 'post',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (uploadType == 'image') {
          addImage(data, file.name);
        } else {
          // create banner path
          bannerPath = `${location.origin}/${data}`;
          // set image as banner's background image
          banner.style.backgroundImage = `url("${bannerPath}")`;
        }
      });
  } else {
    alert('Upload Image only');
  }
};

const addImage = (imagePath, alt) => {
  // gives curor position so that we can add image text to it
  let curPos = articleField.selectionStart;
  let textToInsert = `\r![${alt}](${imagePath})\r`;
  //   inserts image exactly at cursor point
  articleField.value =
    articleField.value.slice(0, curPos) +
    textToInsert +
    articleField.value.slice(curPos);
};
