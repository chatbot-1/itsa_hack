import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnNA1ula2aRvh_gUTPRGz-x4jaV5kOze0",
  authDomain: "healthaura-4d40e.firebaseapp.com",
  projectId: "healthaura-4d40e",
  storageBucket: "healthaura-4d40e.appspot.com",
  messagingSenderId: "560769692467",
  appId: "1:560769692467:web:4955b8746160604d07c446",
  measurementId: "G-PCVZ23ZFT0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);