import firebase from "./firebaseConfig";

export async function uploadFile(file) {
  const storageRef = firebase.storage().ref();
  const { originalFilename, path } = file;
  const fileRef = storageRef.child(originalFilename);

  try {
    const snapshot = await fileRef.put(file);
    const url = await fileRef.getDownloadURL();
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}