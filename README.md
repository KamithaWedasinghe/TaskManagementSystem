Task Management System
A full-stack task management application featuring a .NET 8 Web API, an Angular 18 Frontend, and SQL Server.

🚀 Features
Frontend: Interactive dashboard using PrimeNG tables with custom filtering and sorting.

Backend: Secure RESTful API with Basic Authentication and Global Error Handling.

State Management: Angular Signals for reactive data handling.

Validation: Robust server-side model validation using Data Annotations.

🛠️ Project Structure
/Backend: ASP.NET Core Web API source code.

/Frontend: Angular application with PrimeNG integration.

/Database: SQL scripts to initialize the schema and seed data.

⚙️ Setup Instructions
1. Database Setup
Open SQL Server Management Studio (SSMS).

Create a new database named TaskDb.

Run the script found in /Database/database_setup.sql.

2. Backend Configuration
Navigate to /Backend.

Open appsettings.json and update the ConnectionStrings to point to your local SQL Server instance.

Run the command:

3. Frontend Configuration
Navigate to /Frontend.

Install dependencies:

Start the application:

Access the app at http://localhost:4200.

🔒 Authentication & Security
The API is protected using Basic Authentication.

Username: admin

Password: password123

All requests from the Angular frontend include the encoded Authorization header via a secure service layer.
