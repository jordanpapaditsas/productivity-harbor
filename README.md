# Productivity Harbor

Productivity Harbor is a full stack project, a business operation platform boosting productivity and built for personal use.
It combines user management, authentication and authorization, user settings and role permissions, and a set of productivity tools. 
An admin can drive a lot of the application's data dynamically
through the built-in settings area, so the app can grow without code changes for every
new option.

The project is a monorepo with two parts:

- **`api/`** — ASP.NET Core 10 Web API (C#)
- **`client/`** — Angular 21 single-page application

---

## Tech Stack

**Backend**

- ASP.NET Core 10 Web API (C#)
- Entity Framework Core 10 (code-first, with migrations)
- SQL Server
- ASP.NET Core Identity for users, roles and account management
- JWT-based authentication

**Frontend**

- Angular 21
- Angular Material + Angular CDK
- ngx-toastr (notifications)
- FontAwesome (icons)
- RxJS
- Signals

## Features

- **Authentication & authorization**
  - Login, sign up / register, change password and forgot-password flow
  - JWT token issued on login and used to protect API endpoints
  - Route guards on the client so unauthenticated users are redirected to the login screen
- **Users & permissions**
  - Role-based access: `PhAdmin` (super admin), `Admin`, `User`, `Guest`
  - User management with list and edit screens (create, edit, activate/deactivate, delete)
  - User edit page with a contact-style layout (hero banner, profile details, social links)
- **Dynamic data / parameters (super admin)**
  - Application options area where the super admin can populate and configure data that the
    rest of the app consumes, so the application can be extended through configuration rather
    than code
  - Social media management (define the available social platforms and map them to users)
- **Kanban board**
  - Task list and task edit screens for organizing work in columns
- **UI / UX**
  - Light and dark theme toggle
  - Responsive layout with header, side navigation and footer
  - Reusable shared component library (buttons, data grid, dialogs/popups, select boxes,
    text boxes, toolbar, loading spinner, etc.)
  - Runtime app configuration (service URL, app name, version, logo) loaded from a JSON file
    so it can be changed without rebuilding

## Roadmap / Planned

Ideas that are planned but not built yet (this list will keep growing):

- YouTube playlist simple converter
- Personal space section (per user)
- Custom Calendars with event planner
- Expanded client / employee management
- Notifications / email reminders
- Live chat system
- Analytics
- logs
- AI chat bot assistant
- Additional productivity tools (to be decided)

## Prerequisites

Make sure you have the following installed before you start:

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/) (includes npm)
- SQL Server (LocalDB, Express, or a full instance)
- EF Core CLI tools (for running migrations):
  ```bash
  dotnet tool install --global dotnet-ef
  ```
- Angular CLI, if you prefer the `ng` command directly:
  ```bash
  npm install -g @angular/cli
  ```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jordanpapaditsas/productivity-harbor.git
cd productivity-harbor
```

### 2. Backend (API) setup

The API reads its sensitive configuration from user secrets and a local `appsettings.json`,
(which is git-ignored). At minimum you need a database connection string. The JWT key and seed
passwords have built-in fallbacks for development, but it is recommended to set your own.

- Move into the API folder:
  ```bash
  cd api
  ```
- Configure your settings using .NET user secrets:
  ```bash
  dotnet user-secrets set "JwtSettings:SecretKey" "your-own-long-random-secret-key"
  dotnet user-secrets set "PhAdmin:Password" "Your@StrongPassword1"
  dotnet user-secrets set "Admin:Password" "Your@StrongPassword1"
  ```
  > Notes:
  >
  > - Adjust the connection string for your SQL Server setup (LocalDB, Express, credentials, etc.).
  > - The JWT secret should be a long, random string (it is used to sign tokens with HMAC-SHA256).
  > - If you skip the password secrets, the seeded accounts fall back to the default password `P@ssw0rd`.
- Restore packages:
  ```bash
  dotnet restore
  ```
- Apply the database migrations (creates the database and tables):
  ```bash
  dotnet ef database update
  ```
- Run the API:
  ```bash
  dotnet run
  ```
- The API will start on **http://localhost:5000**. On first run it automatically seeds the roles
  and the default admin accounts.

### 3. Frontend (client) setup

- Open a new terminal and move into the client folder:
  ```bash
  cd client
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Check the runtime configuration in `public/assets/json/appsettings.json` and make sure the
  API URL matches your backend:
  ```json
  {
    "AppServiceUrl": "http://localhost:5000/api/",
    "AppVersion": "",
    "AppName": "Productivity Harbor",
    "AppLogo": ""
  }
  ```
- Start the development server:
  ```bash
  npm start
  ```
- The client will be available on **http://localhost:4200** (the API's CORS policy already allows
  this origin).

## Default Accounts

After the first backend run, two accounts are seeded automatically:

| Username  | Role    | Password                                         |
| --------- | ------- | ------------------------------------------------ |
| `PhAdmin` | PhAdmin | value of `PhAdmin:Password` (default `P@ssw0rd`) |
| `Admin`   | Admin   | value of `Admin:Password` (default `P@ssw0rd`)   |

Log in as `PhAdmin` to access the super-admin settings and start populating the application's
dynamic data.

> Change these passwords (via user secrets, or after logging in) before using the app anywhere
> that is not your local machine.

## Usage

- Open **http://localhost:4200** in your browser.
- Log in with one of the seeded accounts, or register a new user from the sign-up screen.
- As **PhAdmin**, head to the application options / settings to configure parameters and
  populate the dynamic data the rest of the app relies on.
- Use the side navigation to move between areas (Kanban, users, settings, etc.).
- Toggle light / dark mode from the header.
- Edit your profile, manage users, organize tasks on the Kanban board and set up your area for daily use.

## Notes

- This is a personal project and is still under active development, so features and structure
  may change.
- Local configuration files containing secrets (`api/appsettings.json` and the client config under
  `src/app/config/`) are intentionally git-ignored.

## Author

Iordanis Papaditsas
