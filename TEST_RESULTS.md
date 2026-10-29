# Test Results

Tested on: ____ (date)  ·  Web: Chrome, localhost:3000  ·  iOS: iPhone ___ simulator

Write **Pass** or **Fail** in the Result column, and add a screenshot name in Evidence.

| # | Test | How to test | Expected | Result | Evidence |
|---|---|---|---|---|---|
| 1 | Web → iOS (and Android) | Add "Test from web" on the web app | Shows at top of iOS list within seconds | | |
| 2 | iOS → web (and Android) | Add "Test from iOS" on the simulator | Shows at top of web list within seconds | | |
| 3 | Android → web and iOS | Android client not built yet | — | Not tested | Android not started |
| 4 | Complete syncs | Tick a task on web, then untick it on iOS | Checkmark and strikethrough update in the other app | | |
| 5 | Blank title rejected | Submit an empty title and a title of only spaces in each app | Red "Task title can't be empty." message, nothing saved | | |
| 6 | Title > 80 chars rejected | Paste an 81-character title in each app | Red "must be 80 characters or less" message, nothing saved | | |
| 7 | Signed-out user blocked | Rules Playground: `get` on `/tasks/anyId` with Authentication **off**; then `create` with auth off | Both **Denied** | | |
| 8 | No delete / protected fields | Rules Playground (auth **on**): `delete /tasks/{id}`; `update` changing `title`; `update` changing `createdBy` | All **Denied**; `update` of only `completed` is **Allowed** | | |

### Server-side checks (extra evidence for 5 and 6)

The app blocks bad titles, and the rules block them as well. In the Rules Playground (auth on),
try a `create` with `title: "   "` and with an 81-character title. Both should be **Denied**.

### 81-character test string

```
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

### Notes / issues found

-
