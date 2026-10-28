# Simple Task Board

A shared task list with a **React (Next.js) web app** and a **SwiftUI iOS app**.
Both apps read and write the same Firestore collection, `tasks`, so a task added in
one app shows up in the other right away.

```
.
├── app/page.js          Web: main page (signs in, loads tasks)
├── app/layout.js        Web: page frame (title)
├── components/          Web: TaskForm, TaskList, TaskItem
├── lib/firebase.js      Web: Firebase connection
├── ios/TaskBoard/       SwiftUI files (add these to your Xcode project)
├── firestore.rules      Firestore security rules
└── TEST_RESULTS.md      the 8 required test cases
```

## Task fields

| Field | Type | Rule |
|---|---|---|
| title | String | 1–80 characters after trimming |
| completed | Boolean | starts as `false` |
| createdAt | Timestamp | server timestamp |
| createdBy | String | the signed-in user's UID |

Users sign in with **Firebase Anonymous Auth**, so there is no login screen. Every user still gets a UID.

---

## 1. Firebase setup (do this once)

1. Go to https://console.firebase.google.com and create a project.

2. **Authentication → Get started → Sign-in method → Anonymous → Enable.**

3. **Firestore Database → Create database → Production mode.**

4. **Firestore → Rules:** paste the contents of `firestore.rules`, then click **Publish**.

5. The first time a client loads the list, Firestore may need an index for
   `orderBy("createdAt")`. A single-field index is created automatically, so this usually just works.

---

## 2. Web app (Next.js)

Requires Node.js 18 or newer. The web app is at the root of this repo.

```bash
npm install

cp .env.example .env.local     # then fill in your Firebase values

npm run dev
```

Open http://localhost:3000.

The values for `.env.local` come from **Firebase console → Project settings →
Your apps → Add app → Web (</>)**. Restart `npm run dev` after changing `.env.local`.

---

## 3. iOS app (SwiftUI)

Requires a Mac with Xcode 15 or newer.

1. In Xcode, choose **File → New → Project → iOS → App**. Name it `TaskBoard`, set
   Interface to **SwiftUI** and Language to **Swift**.

2. In the Firebase console, go to **Project settings → Add app → iOS** and enter the same
   **bundle ID** as your Xcode project (for example `com.yourname.TaskBoard`).

3. Download **GoogleService-Info.plist** and drag it into the Xcode project
   (tick "Copy items if needed" and your app target).

4. **File → Add Package Dependencies…** → paste
   `https://github.com/firebase/firebase-ios-sdk` → add **FirebaseAuth** and
   **FirebaseFirestore** to the app target.

5. Delete Xcode's starter `ContentView.swift` and `TaskBoardApp.swift`, then drag in
   the four files from `ios/TaskBoard/`:
   `TaskBoardApp.swift`, `ContentView.swift`, `TaskItem.swift`, `TaskRow.swift`.

6. Pick an iPhone simulator and press **Run (⌘R)**.

---

## 4. Android (Jetpack Compose)

Not started yet. The plan is to use the same `tasks` collection and the same anonymous sign-in.

---

## Environment / secrets

These files are **not committed** (see `.gitignore`). Send them to the reviewers and instructor directly:

- `.env.local`: Firebase web config
- `GoogleService-Info.plist`: Firebase iOS config

## Security rules summary

- Reading or writing anything requires sign-in (`request.auth != null`).

- **Create:** the task must have exactly `title`, `completed`, `createdAt` and `createdBy`. The title must be a 1–80
  character string after trimming, `completed` must be `false`, `createdAt` must be the
  server time, and `createdBy` must be your UID.
- **Update:** only `completed` can change, and it must be a boolean.

- **Delete:** never allowed.
