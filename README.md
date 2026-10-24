# Calorie Tracker

A single-page React app for logging meals and tracking daily calorie intake. Users add meal records through a validated modal form, browse them by date, and see a running calorie total for the selected day. Records are saved in the browser, so they survive page reloads.

> Built as a hands-on learning project covering core React concepts: hooks, Context, reducers, routing, side effects and component styling.

---

## Features

- **Meal logging**: add records with a date, meal type (Breakfast, Lunch, Dinner, Snack), content and calories through a modal form.
- **Live form validation**: `useReducer` drives field-level validation, invalid fields are highlighted, and the submit button stays disabled until the form is valid. Negative calories are accepted only for `sport` entries, to represent calories burned.
- **Filter by date**: a date picker shows only the records for the selected day.
- **Daily total**: the calorie count for the visible records is computed and shared through React Context.
- **Duplicate detection**: identical records are rejected, and the user sees an alert.
- **Persistent storage**: records are saved to `localStorage` and loaded on startup.
- **Client-side routing**: Home, Track and record-detail pages with a side navigation that highlights the active link.
- **Friendly error page**: unknown routes show an error screen that redirects to Home after a 10-second countdown.

## Tech Stack

| Area        | Tools                                                         |
| ----------- | ------------------------------------------------------------- |
| UI          | [React 19](https://react.dev)                                 |
| Build tool  | [Vite 8](https://vite.dev) with the React Compiler (Babel preset) |
| Routing     | [React Router 7](https://reactrouter.com) (`createBrowserRouter`) |
| Modal       | [react-modal](https://github.com/reactjs/react-modal)         |
| Styling     | CSS Modules, with [styled-components](https://styled-components.com) explored |
| Linting     | [Oxlint](https://oxc.rs)                                      |
| Persistence | Browser `localStorage`                                        |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20 or later
- npm

### Installation

```bash
git clone https://github.com/<your-username>/calorie-tracker.git
cd calorie-tracker
npm install
```

### Available Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload         |
| `npm run build`   | Build an optimized production bundle in `dist/` |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run Oxlint on the source code                |

After `npm run dev`, open the URL shown in the terminal (usually `http://localhost:5173`).

## Project Structure

```
src/
├── main.jsx                 # App entry point; registers the react-modal root element
├── App.jsx                  # Router configuration
├── index.css                # Global styles and theme variables
├── pages/
│   ├── index.js             # Barrel file re-exporting all pages
│   ├── PageLayout.jsx       # Shared layout: side nav + <Outlet />, wrapped in the context provider
│   ├── LandingPage.jsx      # Home page
│   ├── TrackPage.jsx        # Main page: records state, localStorage, modal form
│   ├── DetailPage.jsx       # Single-record page (/track/:recordId)
│   └── ErrorPage.jsx        # Error page with auto-redirect countdown
└── components/
    ├── AppContext.jsx       # Context for the selected date and total calories
    ├── SideNav.jsx          # Navigation with active-link styling (NavLink)
    ├── ListingSection.jsx   # Date picker and filtered record list
    ├── RecordList.jsx       # Renders records and the daily total
    ├── CalorieRecord.jsx    # A single record row; adds its calories to the total
    ├── CalorieRecordDate.jsx
    ├── RecordEdit.jsx       # Add-record form with useReducer validation
    ├── StyledRecordCell.jsx
    └── Button.jsx
```

## Routes

| Path                | Page          | Description                     |
| ------------------- | ------------- | ------------------------------- |
| `/`                 | `LandingPage` | Welcome screen and entry point  |
| `/track`            | `TrackPage`   | Add, filter and view meal records |
| `/track/:recordId`  | `DetailPage`  | Details for a single record     |
| any other path      | `ErrorPage`   | Error screen with auto-redirect |

## How It Works

- **State and persistence**: `TrackPage` owns the list of records. It reads them from `localStorage` once, through a lazy `useState` initializer, and writes them back in a `useEffect` whenever they change. Dates are stored as strings and converted back to `Date` objects on load.
- **Shared state**: `AppContext` holds the selected date and the calorie total, so deeply nested components such as the form, the list and each record can read and update them without prop drilling.
- **Validation**: `RecordEdit` uses a reducer to track the validity of each field. Calories and content depend on each other: negative calories are valid only when the content is `sport`.
- **Side effects and cleanup**: each `CalorieRecord` adds its calories to the total in an effect and subtracts them in the cleanup, which keeps the total correct when records re-render or are filtered out.

## Concepts Practised

`useState` · `useEffect` (with cleanup) · `useReducer` · `useContext` · `useRef` · `useCallback` · controlled vs. uncontrolled inputs · lifting state up · React Router layouts, nested routes, `NavLink` and `useParams` · CSS Modules · barrel files · `localStorage`

## Roadmap

- [ ] Complete the record detail page with the full record data
- [ ] Edit and delete existing records
- [ ] Remove the simulated loading delay in `ListingSection`
- [ ] Use each record's stored `id` as the list `key` and in detail links
- [ ] Add a daily calorie goal with progress feedback
- [ ] Add charts for weekly and monthly trends
- [ ] Add unit tests (Vitest + React Testing Library)
- [ ] Make the layout fully responsive

## License

This project is available under the [MIT License](LICENSE).
