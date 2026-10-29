# Test Results

**Date tested:** ____________
**Web:** Chrome at http://localhost:3000
**iOS:** iPhone ____ simulator
**Android:** not built yet

---

## Before you start

1. Start the web app: `npm run dev`, then open http://localhost:3000
2. Start the iOS app: open `ios/TaskBoard.xcodeproj` and press **⌘R**
3. Put them side by side.

For each test, fill in **Result** (Pass / Fail) and **Screenshot**.

---

## Test 1: Add a task on web, see it on iOS

1. On the web, type `Test from web` and click **Add Task**.
2. Look at the iOS app.

**Should happen:** it appears at the top of the iOS list in a few seconds.
**Android:** not built yet, skipped.

- **Result:**
- **Screenshot:**

---

## Test 2: Add a task on iOS, see it on web

1. On iOS, type `Test from iOS` and tap **Add Task**.
2. Look at the web app.

**Should happen:** it appears at the top of the web list in a few seconds.
**Android:** not built yet, skipped.

- **Result:**
- **Screenshot:**

---

## Test 3: Add a task on Android, see it on web and iOS

**Not tested.** The Android app is not built yet.

- **Result:** Not tested
- **Screenshot:** none

---

## Test 4: Mark complete on one app, see it on the other

1. On the web, tick `Test from web`.
2. Check iOS: it should show a checkmark and a line through it.
3. On iOS, untick it.
4. Check the web: the box should be empty again.

**Should happen:** the change shows on the other app each time.
**Android:** not built yet, skipped.

- **Result:**
- **Screenshot:**

---

## Test 5: Blank title is rejected

1. On the web, click **Add Task** with the box empty.
2. Try again with only spaces.
3. Do the same on iOS.

**Should happen:** red message "Task title can't be empty." and nothing is added.

- **Result:**
- **Screenshot:**

---

## Test 6: Title over 80 characters is rejected

1. Copy this (81 characters):
   ```
   AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
   ```
2. Paste it into the web app and click **Add Task**.
3. Do the same on iOS.

**Should happen:** red message "Task title must be 80 characters or less." and nothing is added.

- **Result:**
- **Screenshot:**

---

## Test 7: Signed-out users can't read or write

Go to **Firebase console → Firestore → Rules → Rules Playground**.

| Try | Type | Location | Authenticated | Should be |
|---|---|---|---|---|
| 7a | get | `/tasks/test1` | Off | Denied |
| 7b | create | `/tasks/test1` | Off | Denied |

- **Result:**
- **Screenshot:**

---

## Test 8: Can't delete tasks or change protected fields

Still in the **Rules Playground**. For 8b and 8c, use a real task ID from the **Data** tab, and turn on **Build document**.

| Try | Type | Location | Authenticated | Change | Should be |
|---|---|---|---|---|---|
| 8a | delete | `/tasks/test1` | On | none | Denied |
| 8b | update | `/tasks/<real id>` | On | new `title` | Denied |
| 8c | update | `/tasks/<real id>` | On | flip `completed` | **Allowed** |

8c being Allowed shows the rules are not just blocking everything.

- **Result:**
- **Screenshot:**

---

## Status notes

- **Web (React / Next.js):** done.
- **iOS (SwiftUI):** done.
- **Android (Jetpack Compose):** not started yet. It will use the same Firestore `tasks` collection and the same anonymous sign-in, so tests 1 to 4 can be repeated with Android once it is built.

**Other issues found:**
-
