import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
const firebaseConfig = {
  apiKey: "AIzaSyCB8uMx1tlD8arlvQeXo3TUN9YXO5L3d9M",
  authDomain: "pokemontcg-3b5dd.firebaseapp.com",
  projectId: "pokemontcg-3b5dd",
  storageBucket: "pokemontcg-3b5dd.firebasestorage.app",
  messagingSenderId: "842543653853",
  appId: "1:842543653853:web:234cb843f27e17d91d8c34",
  measurementId: "G-NDQ5FKWBJV"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})

export class BaseFirebaseRepositoryService<T> {
  
  constructor() { }

   // Obtener todos los documentos de una colección
   getAll(collectionName: string): Observable<T[]> {
    const colRef = collection(db, collectionName);
    return from(getDocs(colRef).then((snapshot) => 
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T))
    ));
  }

  // Obtener un documento por ID
  getById(collectionName: string, id: string): Observable<T | undefined> {
    const docRef = doc(db, collectionName, id);
    return from(
      getDoc(docRef).then((snapshot) => {
        if (snapshot.exists()) {
          return { id: snapshot.id, ...snapshot.data() } as T;
        }
        return undefined;
      })
    );
  }

 // Agregar un nuevo documento y devolver el objeto T con el ID incluido
 add(collectionName: string, item: any): Observable<T> {
  const colRef = collection(db, collectionName); // Referencia a la colección
  return from(
    addDoc(colRef, item).then((docRef) => {
      // Devuelve el elemento con el ID generado
      return { id: docRef.id, ...item } as T;
    })
  );
}

// Actualizar un documento existente
update(collectionName: string, id: string, item: Partial<T>): Observable<T> {
  const docRef = doc(db, collectionName, id);
  return from(
    updateDoc(docRef, item).then(() => {
      // Devuelve el documento actualizado (requerirá que incluyas el id y los datos actualizados)
      return { id, ...item } as T;
    })
  );
}

// Eliminar un documento y devolver el ID del documento eliminado
delete(collectionName: string, id: string): Observable<string> {
  const docRef = doc(db, collectionName, id);
  return from(
    deleteDoc(docRef).then(() => {
      // Devuelve el ID del documento eliminado
      return id;
    })
  );
}
}
