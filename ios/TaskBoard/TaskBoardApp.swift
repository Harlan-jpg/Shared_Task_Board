import SwiftUI
import FirebaseCore

@main
struct TaskBoardApp: App {

    // connects to firebase using the google service file
    init() {
        FirebaseApp.configure()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
