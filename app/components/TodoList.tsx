import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Todo,
  addTodo,
  deleteTodo,
  getTodos,
  initDB,
  updateTodo,
} from "../services/todoService";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    (async () => {
      try {
        await initDB();
        await reload();
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  async function reload() {
    const data = await getTodos();
    setTodos(data);
  }

  async function handleSave() {
    if (!text.trim()) {
      Alert.alert("Kosong?", "Isi dulu tugasnya kawan.");
      return;
    }

    if (editingId) {
      await updateTodo(editingId, { text: text.trim() });
      setEditingId(null); 
      setText("");
      Keyboard.dismiss();
      await reload();
    } else {
      await addTodo(text.trim());
      setText("");
      Keyboard.dismiss();
      await reload();
    }
  }

  function startEdit(item: Todo) {
    setText(item.text);       
    setEditingId(item.id!);  
    inputRef.current?.focus();
  }

  function cancelEdit() {
    setEditingId(null);
    setText("");
    Keyboard.dismiss();
  }

  async function handleToggle(item: Todo) {
    await updateTodo(item.id!, { done: item.done ? 0 : 1 });
    await reload();
  }

  function confirmDelete(id: number) {
    Alert.alert("Hapus", "Yakin mau menghapus data ini?", [
      { text: "Batal", style: "cancel" },
      { text: "Ya, Hapus", style: "destructive", onPress: async () => {
          if (editingId === id) cancelEdit();
          await deleteTodo(id);
          await reload();
      }},
    ]);
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return todo.done === 0;
    if (filter === "completed") return todo.done === 1;
    return true;
  });

  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.done === 1).length;
  const pendingCount = totalCount - completedCount;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return dateString.substring(0, 16); 
  };

  const renderItem = ({ item }: { item: Todo }) => {
    const isDone = item.done === 1;
    const isEditing = editingId === item.id;

    return (
      <View style={[
        styles.card, 
        isDone && styles.cardDone,
        isEditing && styles.cardEditing 
      ]}>
        
        <View style={[styles.statusStrip, { backgroundColor: isDone ? "#00E676" : "#6C63FF" }]} />

        <View style={styles.cardContent}>
          <View style={{ flex: 1 }}>
            
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text style={[styles.itemTitle, isDone && styles.textDone]}>
                {item.text}
              </Text>

              
              <View style={{ flexDirection: 'row' }}>
                
                <TouchableOpacity onPress={() => startEdit(item)} style={{ paddingHorizontal: 8 }}>
                  <Feather name="edit-2" size={18} color="#2196F3" />
                </TouchableOpacity>

                
                <TouchableOpacity onPress={() => confirmDelete(item.id!)} style={{ paddingLeft: 8 }}>
                  <MaterialIcons name="delete-outline" size={20} color="#FF5252" />
                </TouchableOpacity>
              </View>
            </View>
            
            
            <View style={styles.metaRow}>
              <TouchableOpacity 
                style={[styles.statusButton, isDone ? styles.statusButtonDone : styles.statusButtonActive]}
                onPress={() => handleToggle(item)}
              >
                 <Text style={styles.statusButtonText}>
                   {isDone ? "Selesai" : "Proses"}
                 </Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="clock" size={10} color="#6c757d" style={{ marginRight: 4 }} />
                <Text style={styles.dateText}>
                  {formatDate(item.updated_at)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#10101E" />
      
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>
          {editingId ? "Editing Mode" : "Welcome Back,"}
        </Text>
        <Text style={styles.headerTitle}>
          {editingId ? "Update Task" : "My Tasks"}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalCount}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: "#6C63FF" }]}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: "#00E676" }]}>{completedCount}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
      </View>

    
      <View style={styles.inputWrapper}>
        <TextInput
          ref={inputRef} 
          style={[styles.input, editingId ? styles.inputEditing : null]} 
          placeholder={editingId ? "Update your task..." : "New task..."}
          placeholderTextColor="#555"
          value={text}
          onChangeText={setText}
        />
        
        
        <TouchableOpacity 
          style={[styles.addBtn, editingId ? styles.addBtnEditing : null]} 
          onPress={handleSave}
        >
          <Feather name={editingId ? "check" : "plus"} size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      
      {editingId && (
        <TouchableOpacity onPress={cancelEdit} style={{alignSelf: 'flex-end', marginBottom: 10}}>
          <Text style={{color: '#FF5252', fontSize: 12}}>Cancel Edit</Text>
        </TouchableOpacity>
      )}

      <View style={styles.filterRow}>
        {(["all", "active", "completed"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterPill, filter === f && styles.filterPillActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Ionicons name="documents-outline" size={50} color="#333" />
            <Text style={{ color: "#555", marginTop: 10 }}>No tasks found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10101E",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginVertical: 20,
  },
  headerSubtitle: {
    color: "#6c757d",
    fontSize: 14,
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  statBox: {
    backgroundColor: "#1E1E2E",
    width: "30%",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2D2D44",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#6c757d",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    marginBottom: 10, 
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#1E1E2E",
    color: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#2D2D44",
  },
  inputEditing: {
    borderColor: "#2196F3", 
    backgroundColor: "#19202E",
  },
  addBtn: {
    backgroundColor: "#6C63FF",
    width: 50,
    height: 50,
    borderRadius: 12,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
  },
  addBtnEditing: {
    backgroundColor: "#2196F3", 
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 5,
  },
  filterPill: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2D2D44",
    backgroundColor: "transparent",
  },
  filterPillActive: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },
  filterText: {
    color: "#6c757d",
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFF",
  },
  card: {
    backgroundColor: "#1E1E2E",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    flexDirection: "row",
    elevation: 2,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardEditing: {
    borderColor: "#2196F3", 
  },
  cardDone: {
    opacity: 0.6,
  },
  statusStrip: {
    width: 6,
    height: "100%",
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  itemTitle: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "500",
    marginBottom: 12,
    lineHeight: 22,
    maxWidth: "80%", 
  },
  textDone: {
    textDecorationLine: "line-through",
    color: "#6c757d",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusButtonActive: {
    backgroundColor: "#2D2D44",
  },
  statusButtonDone: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2D2D44",
  },
  statusButtonText: {
    fontSize: 10,
    color: "#AAA",
    fontWeight: "bold",
  },
  dateText: {
    color: "#6c757d",
    fontSize: 11,
    fontStyle: 'italic',
  },
});