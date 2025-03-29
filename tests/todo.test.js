const { addDoc, updateDoc, deleteDoc, collection, onSnapshot } = require('firebase/firestore');
const { FIRESTORE_DB } = require('../FirebaseConfig');

jest.mock('../FirebaseConfig', () => ({
    FIREBASE_APP: {},
    FIRESTORE_DB: {},
  }));
  

describe('Todo CRUD Operations', () => {
  test('should add a new todo', async () => {
    const mockTodo = { title: 'Test Task', done: false };

    await addDoc(collection(FIRESTORE_DB, 'todos'), mockTodo);
    
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), mockTodo);
  });

  test('should update a todo', async () => {
    const mockRef = { id: '123' };
    const mockUpdateData = { done: true };

    await updateDoc(mockRef, mockUpdateData);

    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockRef, mockUpdateData);
  });

  test('should delete a todo', async () => {
    const mockRef = { id: '123' };

    await deleteDoc(mockRef);

    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(mockRef);
  });

  test('should listen for real-time updates', () => {
    onSnapshot(collection(FIRESTORE_DB, 'todos'), jest.fn());

    expect(onSnapshot).toHaveBeenCalledTimes(1);
  });
});
