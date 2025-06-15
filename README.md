Safwork
A small Angular 20 “job board” demo app showcasing:

Standalone components

Signals for state management

LocalStorage persistence

Reactive forms (with validation)

Favorites toggle

Instant search (with persistence)

Pagination

Angular Material styling

E2E tests with Playwright

Prerequisites
Node.js ≥ 18

npm ≥ 8

Installation

git clone <your-repo-url>
cd safwork
npm install
Available Scripts
Command	What it does
ng serve	Run the dev server at http://localhost:4200
ng build	Build the app for production (in dist/)
npm run e2e	Run Playwright E2E tests (headless)
npm run e2e:headed	Run Playwright E2E tests in headed mode

Features
Reactive Forms & Validation
– Three required fields (title, company, location)
– Max length: 21 characters

Signals & LocalStorage
– jobsSignal: Signal<Job[]> holds job listings
– favSignal: Signal<Set<number>> tracks favorites
– effect(...) automatically syncs both to localStorage

Search & Filter
– searchTerm = signal<string>()
– filteredJobs = computed(...) filters by title, company, or location
– Search term persists after page reload

Favorites Toggle
– Click the star icon to toggle a favorite
– “Ulubione / Wszystkie” button filters the list

Pagination
– pageSize = 10
– currentPage = signal(1)
– pagedJobs = computed(...) slices filteredJobs()
– Prev / Next buttons navigate pages

Styling
– Uses Angular Material components (buttons, inputs, table, snackbar)

E2E Testing
We use Playwright to verify core flows:

Adding a job

Deleting a job


npm run e2e       
npm run e2e:headed  

Tests live under the e2e/ directory and each run starts from a clean state.

