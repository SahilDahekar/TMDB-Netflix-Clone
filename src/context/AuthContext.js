import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut , onAuthStateChanged} from "firebase/auth";
import {setDoc ,doc} from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({});

    function signUp(email, password){
        createUserWithEmailAndPassword(auth,email,password);
        setDoc(doc(db , 'users' , email),{
            myList:[]
        })
    }

    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }

    function logOut(){
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscirbe = onAuthStateChanged(auth, (current) => {
            setUser(current);
        });

        return () => {
            unsubscirbe();
        }
    },[])

    return (
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext);
}