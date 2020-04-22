import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkq-e_bV_GiNYIBmB6D4rjtOzB1n0x6Js",
  authDomain: "places-cfdaa.firebaseapp.com",
  databaseURL: "https://places-cfdaa.firebaseio.com",
  projectId: "places-cfdaa",
  storageBucket: "places-cfdaa.appspot.com",
  messagingSenderId: "700497889963",
  appId: "1:700497889963:web:a2118a202f88d1c21a85ee",
  measurementId: "G-HRT5LGVDWH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createEventDocument = async (event) => {
  const eventRef = firestore.doc("events/" + event.id);
  //const snapShot = await eventRef.get();
  const snap = 1;

  const createdAt = new Date();

  try {
    await eventRef.set({
      ...event,
      createdAt,
    });
  } catch (error) {
    console.log("error creating event", error.message);
  }

  return eventRef;
};

export const updateParticipants = async (eventId, user) => {
  const docRef = firestore.doc("events/" + eventId);

  try {
    await docRef.set(
      {
        participants: {
          [user.id]: user,
        },
      },
      { merge: true }
    );
  } catch (err) {
    console.log("error updating participants", err.message);
  }
};

export const removeParticipant = async (eventId, newParticipantsList) => {
  const docRef = firestore.doc("events/" + eventId);

  try {
    await docRef.update({
      participants: {
        ...newParticipantsList,
      },
    });
  } catch (err) {
    console.log("error updating participants", err.message);
  }
};

export const getAllEvents = async () => {
  const snapShot = await firestore.collection("events").get();

  return snapShot.docs.map((doc) => doc.data());
};
export const removeEventDocument = async (id) => {
  const eventRef = firestore.doc("events/" + id);

  try {
    await eventRef.delete();
  } catch (error) {
    console.log("error creating event", error.message);
  }
  return eventRef;
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc("users/" + userAuth.uid);
  const snapShot = await userRef.get();

  // console.log(snapShot);

  if (!snapShot.exists) {
    const { firstName, lastName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        firstName,
        lastName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
