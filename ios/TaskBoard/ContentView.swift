import SwiftUI
import FirebaseAuth
import FirebaseFirestore

struct ContentView: View {

    // state means the screen redraws when these change
    @State private var tasks: [TaskItem] = []
    @State private var newTitle = ""
    @State private var isLoading = true
    @State private var errorMessage = ""

    // holds the live connection so we only start it once
    @State private var listener: ListenerRegistration? = nil

    let db = Firestore.firestore()

    var body: some View {
        NavigationStack {
            VStack {
                HStack {
                    
                    TextField("Enter a task", text: $newTitle)
                        .textFieldStyle(.roundedBorder)
                    Button("Add Task") {
                        addTask()
                    }
                }
                .padding()

                if errorMessage != "" {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .padding(.horizontal)
                }

                if isLoading {
                    ProgressView("Loading tasks...")
                    Spacer()
                    
                } else if tasks.isEmpty {
                    Text("No tasks yet. Add one above!")
                        .foregroundColor(.gray)
                    Spacer()
                    
                } else {
                    List(tasks) { task in
                        TaskRow(task: task, onToggle: { toggleTask(task) })
                    }
                }
            }
            
            .navigationTitle("My Tasks")
        }
        .onAppear {
            signIn()
        }
    }

    // signs in without an email or password but still gives a user id
    func signIn() {
        if Auth.auth().currentUser != nil {
            listenForTasks()
            return
        }

        Auth.auth().signInAnonymously { result, error in
            if let error = error {
                errorMessage = "Could not sign in: \(error.localizedDescription)"
                isLoading = false
                return
            }
            listenForTasks()
        }
    }

    // live updates so tasks from other apps show up right away
    func listenForTasks() {
        if listener != nil {
            return
        }

        listener = db.collection("tasks")
            .order(by: "createdAt", descending: true)
            .addSnapshotListener { snapshot, error in
                isLoading = false

                if let error = error {
                    errorMessage = "Could not load tasks: \(error.localizedDescription)"
                    return
                }

                var newList: [TaskItem] = []
                for doc in snapshot?.documents ?? [] {
                    
                    let data = doc.data()
                    // tries to read the value as that type and uses a backup value if it cant
                    let title = data["title"] as? String ?? ""
                    
                    let completed = data["completed"] as? Bool ?? false
                    newList.append(TaskItem(id: doc.documentID, title: title, completed: completed))
                }
                tasks = newList
            }
    }

    func addTask() {
 
        let title = newTitle.trimmingCharacters(in: .whitespacesAndNewlines)

        if title.isEmpty {
            errorMessage = "Task title can't be empty."
            return
        }
        
        if title.count > 80 {
            errorMessage = "Task title must be 80 characters or less."
            return
        }

       
        guard let uid = Auth.auth().currentUser?.uid else {
            errorMessage = "You are not signed in."
            
            return
        }

        errorMessage = ""

        db.collection("tasks").addDocument(data: [
            "title": title,
            "completed": false,
            "createdAt": FieldValue.serverTimestamp(),  // firebase sets the time instead of the phone
            
            "createdBy": uid
            
        ]) { error in
            if let error = error {
                errorMessage = "Could not add task: \(error.localizedDescription)"
            }
        }

        newTitle = ""
    }

    // only sends completed because the rules block changing anything else
    
    func toggleTask(_ task: TaskItem) {
        db.collection("tasks").document(task.id).updateData([
            
            "completed": !task.completed
        ]) { error in
            
            if let error = error {
                
                errorMessage = "Could not update task: \(error.localizedDescription)"
            }
        }
    }
    
}
