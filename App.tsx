import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Auth, initializeAuth, getAuth, connectAuthEmulator } from 'firebase/auth';
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const testfunction = async () => {
  let firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx.firebaseapp.com",
    projectId: "xxxx",
    storageBucket: "xxxx.appspot.com",
    messagingSenderId: "xxxx",
    appId: "xxxxx",
  };

  let app: FirebaseApp;
  let auth: Auth;
  // to prevent reinitalization error:
  // FirebaseError: Firebase: Error (auth/already-initialized).
  // https://github.com/firebase/firebase-js-sdk/issues/1847#issuecomment-1041548028
  if (getApps().length < 1) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } else {
    app = getApp();
    auth = getAuth();
  }


  connectAuthEmulator(auth, `http://127.0.0.1:9099}`);

  const result = await createUserWithEmailAndPassword(
    auth,
    "qwe@qwe.qwe",
    "qweqwe"
  );
  console.log(result);
  
};

export default function App() {
  testfunction();
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
