import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, FlatList, Alert } from 'react-native';
import { getAllQuotes, addQuote, updateQuote, deleteQuote } from '../../services/quoteService';
import { useUserRole } from '../../hooks/useUserRole';

type Quote = { id: string; text: string; author: string; category: string };

export default function AdminQuotesScreen() {
    const role = useUserRole();
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        const data = await getAllQuotes();
        setQuotes(data as Quote[]);
    };

    const handleSave = async () => {
        if (!text || !author || !category) {
            Alert.alert('Please fill in all fields.');
            return;
        }
        if (editingId) {
            await updateQuote(editingId, { text, author, category });
        } else {
            await addQuote(text, author, category);
        }
        setText('');
        setAuthor('');
        setCategory('');
        setEditingId(null);
        fetchQuotes();
    };

    const handleEdit = (quote: Quote) => {
        setText(quote.text);
        setAuthor(quote.author);
        setCategory(quote.category);
        setEditingId(quote.id);
    };

    const handleDelete = (id: string) => {
        Alert.alert('Delete Quote', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive', onPress: async () => {
                    await deleteQuote(id);
                    fetchQuotes();
                }
            }
        ]);
    };

    if (role !== 'admin') {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Access Denied</Text>
                <Text style={styles.subtitle}>You must be an admin to view this page.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Quotes</Text>

            <TextInput
                style={styles.input}
                placeholder="Quote text"
                placeholderTextColor="#94a3b8"
                value={text}
                onChangeText={setText}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Author"
                placeholderTextColor="#94a3b8"
                value={author}
                onChangeText={setAuthor}
            />
            <TextInput
                style={styles.input}
                placeholder="Category (mindfulness / focus / wellness)"
                placeholderTextColor="#94a3b8"
                value={category}
                onChangeText={setCategory}
            />

            <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>{editingId ? 'Update Quote' : 'Add Quote'}</Text>
            </Pressable>

            <FlatList
                data={quotes}
                keyExtractor={(item) => item.id}
                style={{ width: '100%', marginTop: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.quoteCard}>
                        <Text style={styles.quoteText}>{'"{item.text}"'}</Text>
                        <Text style={styles.quoteAuthor}>— {item.author} · {item.category}</Text>
                        <View style={styles.actions}>
                            <Pressable onPress={() => handleEdit(item)} style={styles.editBtn}>
                                <Text style={styles.editText}>Edit</Text>
                            </Pressable>
                            <Pressable onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                                <Text style={styles.deleteText}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 0,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
    },
    input: {
        width: '100%',
        backgroundColor: '#1e293b',
        color: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#38bdf8',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    quoteCard: {
        backgroundColor: '#1e293b',
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
    },
    quoteText: {
        color: '#e2e8f0',
        fontStyle: 'italic',
        fontSize: 14,
        marginBottom: 4,
    },
    quoteAuthor: {
        color: '#94a3b8',
        fontSize: 12,
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    editBtn: {
        backgroundColor: '#334155',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    editText: {
        color: '#38bdf8',
        fontWeight: '600',
    },
    deleteBtn: {
        backgroundColor: '#334155',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    deleteText: {
        color: '#f87171',
        fontWeight: '600',
    },
});