# Tasks To Do

1. **Refactor Project**
   - a. Add ngrx signal store state management, refactor services
   - b. Refactor styles.scss with the new light/dark theme functionality
   - c. Add material snackbar for notifications
   - d. Remove shared components from current project, create new angular repo and publish them as library
   - e. Versioning

2. **Permissions Business System**
   - a. Continue integrating modules.json
   - b. Create a service that reads the json and for each property it uses Create method from ModuleService to insert Modules in Database.
   - c. Use the service in program.cs, but make it to read which module is new so it won't try to create duplicates. So skip old ones, and insert only new ones.
   - d. Analyze and implement the next step of Modules, which is the navigation system from back to front.
