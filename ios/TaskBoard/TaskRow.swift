import SwiftUI

struct TaskRow: View {
    var task: TaskItem
    var onToggle: () -> Void  // func from main screen that runs when tapped

    var body: some View {
        HStack {
            Button {
                onToggle()
            } label: {
                Image(systemName: task.completed ? "checkmark.circle.fill" : "circle")
            }
            .buttonStyle(.plain)

            Text(task.title)
                .strikethrough(task.completed)
        }
    }
}
