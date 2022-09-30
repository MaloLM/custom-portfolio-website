import firebase from "../firebase";
import { toNumber } from "@vue/shared";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const db = firebase.database()

class DatabaseService {

  getAll() {
    return db.ref("/pages");
  }

  
  getAboutMeOrCareerData(path, dataType){
    return db.ref("/pages/"+ path +"/" + dataType);
  }


  getPostsByPathAndId(path, id){
    return db.ref("/pages/" + path + '/' + id);
  }


  async updatePostByPathAndId(path, id, children){
    db.ref('/pages/' + path + '/' + id).update(children);
  }


  getIdCount(path){
    return db.ref("/pages/"  + 'id-count/' + path + '/value');
  }


  incrementIdCount(path){
    console.log('DA')
    this.getIdCount(path).on('value', (snapshot) => {
      console.log('DB')
      console.log(snapshot.val())
      console.log('DC')
      if(isNaN(snapshot.val())){
        console.log('DDA NaN')
        var idCount = toNumber(snapshot.val()) + 1
        console.log(idCount)
        const res = {
          value: idCount
        } 
        console.log('DEA', res)
        db.ref("/pages/id-count/" + path + '/').update(res);
        console.log('DFA')
      } else {
        console.log('DDB')
        const res = {
          value: snapshot.val() + 1
        }
        console.log('DEB', res)
        // db.ref("/pages/id-count/" + path + '/').update(res);
        console.log('DFB')
      } 
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    }); 
  }


  decrementIdCount(path){
    this.getIdCount(path).on('value', (snapshot) => {
      if(isNaN(snapshot.val())){
        var idCount = toNumber(snapshot.val()) - 1
        const res = {
          value: idCount
        }
        db.ref("/pages/"  + 'id-count/' + path + '/').update(res);
      } else {
        const res = {
          value: idCount
        }
        db.ref("/pages/"  + 'id-count/' + path + '/').update(res);
      } 
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    }); 
  }

  async createPost(path, post){
    console.log('right before creation', post)
    db.ref('/pages/' + path).push(post);
  }
  
  getPersonnalProjects(){
    return db.ref("/pages/about-me/personnal-projects");
  }


  getHobbiesAndInterests(){
    return db.ref("/pages/about-me/hobbies-and-interests");
  }


  getEducation(){
     return db.ref("/pages/career/education");
  }
  

  getProfessionalProjects(){
     return db.ref("/pages/career/professional-projects");
  }

  
  getJobExperiences(){
    return db.ref("/pages/career/job-experiences");
  }

  getPosts(path){
    return db.ref('/pages/'+ path + '/');
  }


  removePost(path, id) {
    return db.ref('/pages/'+ path + '/').child(id).remove();
  }

  // updateAboutMeOrCareerData(path, title, description, image){
    
  //   var children = {
  //     title: title,
  //     description: description,
  //     image: image
  //   }
  //   db.ref('/pages/' + path).update(children);
  // }

  uploadFileThenUpdateAboutMe(path, file, title, description){
    // https://firebase.google.com/docs/storage/web/upload-files
    const storage = getStorage();
    const storageRef = ref(storage, 'images/'+ file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
  
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          console.log("error: ", error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            var children = {
              title: title,
              description: description,
              image: downloadURL
            }
            db.ref('/pages/' + path).update(children);
            
           });
        }
      );
  }

  // createAboutMe(data) {
  //   return db.push(data);
  // }


  update(key, value) {
    return db.child(key).update(value);
  }


  deleteAll() {
    return db.remove();
  }


  async logIn( email, password ){
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (response) {
          return true  
          } else {
            return false
          }
      }


  uploadFileThenPushPost(file, filename, formType) {
    // https://firebase.google.com/docs/storage/web/upload-files
    const storage = getStorage();
    const storageRef = ref(storage, 'images/'+ filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          console.log("error: ", error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            let dataToUpdate = {
              image: downloadURL
            }

            this.getPosts(formType).on('value', (snapshot) => {

              let posts = snapshot.val()
              let max = {
                id: 0,
                value: 0,
              }
              
              Object.entries(posts).forEach(([key, value]) => {
               
                if(value.createdAt > max.value){
                  max.value = value.createdAt
                  max.id = key
                }
              })
              this.updatePostByPathAndId(formType, max.id, dataToUpdate)

          }, (errorObject) => {
              console.log('The read failed: ' + errorObject.name);
          }); 
            
          });
        }
      );
  }


  uploadFileThenUpdatePost(file, formType, postId, filename) {
    // https://firebase.google.com/docs/storage/web/upload-files
    const storage = getStorage();
    const storageRef = ref(storage, 'images/'+ filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
  
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          console.log("error: ", error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {

            let dataToUpdate = {
                image: downloadURL
            }
            this.updatePostByPathAndId(formType, postId, dataToUpdate)
           });
        }
      );

  }

}

export default new DatabaseService();