// Copyright (c) [2023] [Malo Le Mestre]
// This software is released under the MIT License
// https://opensource.org/licenses/MIT

import firebase from "../firebase.client";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const db = firebase.database()
const auth = firebase.auth();

class DatabaseService {

  isUserAuthenticated(){
    return (auth.currentUser !== null)
  }

  signOut(){
    auth.signOut(user => {
      console.log('signed out', user);
    })
    .catch(error => {
        console.error(error);
    });
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

  async createPost(path, post){
    db.ref('/pages/' + path).push(post);
  }
  
  updatePost(path, children){
    db.ref('/pages/' + path).update(children);
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

  uploadFileThenUpdateAboutMe(path, file, firstname, lastname, description){
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
            console.log("check here: " + downloadURL)
            var children = {
              firstName: firstname,
              lastName: lastname,
              description: description,
              image: downloadURL
            }
            db.ref('/pages/' + path).update(children);
            
           });
        }
      );
  }

  uploadFileThenUpdateCareer(path, file, title, description){
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
            console.log("check here: " + downloadURL)
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

  update(key, value) {
    return db.child(key).update(value);
  }

  async logIn( email, password ){
        const response = await firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
          console.log(userCredential.user)
          return true
        })
        .catch((error) => {
          return error.message
        });
        return response
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
        }, () => {
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

  getCurriculumVitaeLink(){
    return db.ref("/pages/curriculumVitae/link");
  }

  updateCurriculumVitaeLink(children){
    db.ref('/pages/curriculumVitae/').update(children);
  }

  uploadCurriculumVitae(file, filename,){
    console.log('to upload')    

    // https://firebase.google.com/docs/storage/web/upload-files
    const storage = getStorage();
    const storageRef = ref(storage, 'cv/'+ filename + '.pdf');
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
                link: downloadURL
            }
            this.updateCurriculumVitaeLink(dataToUpdate)
           });
        }
      );
  }


}

export default new DatabaseService();