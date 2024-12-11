import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
  addDoc,
  limitToLast,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import app, { storage } from '@/lib/firebase/init';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const firestore = getFirestore(app);
export const validateBody = (required, properties, body) => {
  if (required)
    for (const key of required) {
      if (!body.hasOwnProperty(key)) {
        return {
          valid: false,
          message: `Missing required key: ${required}`,
        };
      }
    }

  for (const key in body) {
    if (!(Array.isArray(body[key]) && body[key].length > 0 && properties[key].type === 'array')) {
      if (properties[key]?.type === 'object') {
        for (const props in properties[key].properties) {
          if (!body[key].hasOwnProperty(props)) {
            return {
              valid: false,
              message: `Missing required key: ${Object.keys(properties[key].properties)} at ${key}`,
            };
          } else {
            if (typeof body[key][props] !== properties[key].properties[props].type) {
              return {
                valid: false,
                message: `Invalid type for key: ${props} at ${key}, expected ${properties[key].properties[props].type}`,
              };
            }
          }
        }
      }
      if (properties[key] && typeof body[key] !== properties[key].type) {
        return {
          valid: false,
          message: `Invalid type for key: ${key}, expected ${properties[key].type}`,
        };
      }
    }
  }

  const data = { ...properties };
  for (const key in data) {
    data[key] = body[key] || defaultType(properties[key].type);
  }

  return { valid: true, data };
};
export const uploadFile = async (path, file) => {
  const mountainsRef = ref(storage, path);
  try {
    const uploadTask = uploadBytesResumable(mountainsRef, file);
    await uploadTask;
    return true;
  } catch (error) {
    console.error('Upload error:', error);
    return false;
  }
};

export async function retrieveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    [`id-${collectionName}`]: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName, id) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  if (data) data[`id-${collectionName}`] = snapshot.id;
  return data;
}

export const retrieveDataByArray = async (collectionName, field, value) => {
  console.log(value);
  const q = query(collection(firestore, collectionName), where(field, 'in', value));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    [`id-${collectionName}`]: doc.id,
    ...doc.data(),
  }));
  return data;
};
export const mergeObjects = (target, source) => {
  const result = { ...target };

  for (const key in source) {
    if (
      source.hasOwnProperty(key) &&
      (source[key] || Number.isInteger(source[key]) || typeof source[key] === 'boolean')
    )
      if (
        !source[key].length == 0 ||
        Number.isInteger(source[key]) ||
        typeof source[key] === 'boolean'
      )
        result[key] = source[key];
  }

  return result;
};
export async function createData(collectionName, data) {
  const snapshot = await addDoc(collection(firestore, collectionName), {
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  const userData = await retrieveDataById(collectionName, snapshot.id);
  return userData;
}

export async function updateData(collectionName, id, data) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Date.now(),
  });
  const finalData = await retrieveDataById(collectionName, id);
  return finalData;
}

export async function deleteData(collectionName, id) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef);
}

export const retrieveDataByField = async (collectionName, field, value) => {
  const q = query(collection(firestore, collectionName), where(field, '==', value));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    [`id-${collectionName}`]: doc.id,
    ...doc.data(),
  }));
  console.log(data);
  return data;
};
