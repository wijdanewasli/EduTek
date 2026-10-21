# EduTek

Frontend prototype of a school workspace for teachers, students, and administrators. Courses, assignments, attendance, messaging, and related pages use local sample data until an API is connected.

## Requirements

- Node.js 22 or later
- npm

## Run locally

```sh
npm install
npm run dev
```

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

The login page includes demo accounts. Pick a role, then click the demo box to fill the form:

| Role | Email | Password |
| --- | --- | --- |
| Teacher | `amine.mansour@edutek.example` | `enseignant2026` |
| Student | `sarah.benali@edutek.example` | `etudiant2026` |
| Admin | `nour.haddad@edutek.example` | `admin2026` |

Session state stays in the browser (session storage). There is no backend.

## Scripts

```sh
npm run dev      # local server
npm run build    # production build
npm run preview  # preview the production build
npm test         # unit tests
```
