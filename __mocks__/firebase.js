// Mock Firestore functions
const mockCollection = jest.fn();
const mockAddDoc = jest.fn();
const mockUpdateDoc = jest.fn();
const mockDeleteDoc = jest.fn();
const mockOnSnapshot = jest.fn((_, callback) => callback({ docs: [] }));

// Mock Firestore module
jest.mock('firebase/firestore', () => ({
  collection: mockCollection,
  addDoc: mockAddDoc,
  updateDoc: mockUpdateDoc,
  deleteDoc: mockDeleteDoc,
  onSnapshot: mockOnSnapshot,
}));

// Export the mocks so we can use them in tests
export { mockCollection, mockAddDoc, mockUpdateDoc, mockDeleteDoc, mockOnSnapshot };
