import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { Ionicons, Entypo } from '@expo/vector-icons';

export interface Todo {
    done: boolean;
    id: string;
    title: string;
}

// ✅ Define navigation types
type RootStackParamList = {
    List: undefined;
    PrayerTimes: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

const List = () => {
    const navigation = useNavigation<NavigationProp>();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState('');

    // ✅ Add new task to Firestore
    const addTodo = async () => {
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, 'todos'), {
                title: todo,
                done: false
            });
            await updateDoc(docRef, { id: docRef.id });
            setTodo('');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    // ✅ Fetch tasks in real-time from Firestore
    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');
        const subscriber = onSnapshot(todoRef, (snapshot) => {
            const todos: Todo[] = snapshot.docs.map((doc) => ({
                ...(doc.data() as Todo),
                id: doc.id
            }));
            setTodos(todos);
        });

        return () => subscriber();
    }, []);

    // ✅ Function to render each task
    const renderTodo = ({ item }: { item: Todo }) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

        // Toggle completion status
        const toggleDone = async () => {
            await updateDoc(ref, { done: !item.done });
        };

        // Delete a task
        const deleteItem = async () => {
            await deleteDoc(ref);
        };

        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done ? (
                        <Ionicons name="checkmark-circle" size={24} color="green" />
                    ) : (
                        <Entypo name="circle" size={24} color="black" />
                    )}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteItem} style={styles.deleteButton}>
                    <Ionicons name="trash-bin-outline" size={24} color="red" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* ✅ App Title (Centered) */}
            <Text style={styles.appTitle}>Sa'Ae</Text>

            {/* ✅ Navigation Button to Prayer Times Screen */}
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('PrayerTimes')}>
                <Text style={styles.navButtonText}>Go to Prayer Times</Text>
            </TouchableOpacity>

            {/* ✅ Input for adding new tasks */}
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Add new task"
                    placeholderTextColor="#7D7D7D"
                    onChangeText={(text: string) => setTodo(text)}
                    value={todo}
                />
                <TouchableOpacity
                    style={[styles.addButton, todo === '' && { opacity: 0.5 }]}
                    onPress={addTodo}
                    disabled={todo === ''}
                >
                    <Text style={styles.addButtonText}>Add Task</Text>
                </TouchableOpacity>
            </View>

            {/* ✅ Display the list of tasks */}
            {todos.length > 0 && (
                <FlatList data={todos} renderItem={renderTodo} keyExtractor={(todo) => todo.id} />
            )}
        </View>
    );
};

// ✅ Styles for UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CBD5C0', // Sage green background
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#4A6652',
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: 16,
        color: '#2E2E2E',
    },
    addButton: {
        backgroundColor: '#4A6652', // Dark green button
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginLeft: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    navButton: {
        backgroundColor: '#4A6652',
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    todoText: {
        fontSize: 18,
        color: '#2E2E2E',
        marginLeft: 10,
    },
    deleteButton: {
        padding: 5,
    },
});

export default List;
