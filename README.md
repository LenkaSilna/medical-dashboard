# Medical Dashboard

This is a medical dashboard application designed for displaying patient medical data, including patient information, MRI images, and other related details. It provides an interactive user interface for comparing MRI images, managing patient information, and supporting various features such as theming and dynamic data fetching.

## Features

- **Patient Information**: Displays basic information about the patient including name, age, gender, blood type, weight, height, contact information, diagnosis, and medical history.
- **MRI Image Comparison**: Allows users to compare MRI images side-by-side with zoom functionality.
- **Responsive Design**: The application is fully responsive and works well on both desktop and mobile devices.
- **Theming**: Supports light and dark themes that can be toggled dynamically.
- **Dynamic Data Fetching**: Patient data is fetched from a GraphQL API.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **GraphQL**: For querying patient data.
- **TypeScript**: Superset of JavaScript for type safety.
- **React Icons**: For adding icons to the UI.

## Installation

### Step 1: Install Dependencies

Clone the repository and install the required dependencies using the following commands:

```
git clone https://github.com/LenkaSilna/medical-dashboard.git
cd medical-dashboard
npm install
```

### Step 2: Start the Development Server

Once the dependencies are installed, you can start the development server:

```
npm run dev
```

## Folder Structure

The folder structure of the project is as follows:

```
src/
    app/
    components/           # Reusable components (e.g., Header, ImageComparison, etc.)
    context/              # React Context for managing global state (e.g., ThemeContext)
    data/                 # Sample data or API responses (e.g., patient-data.json)
    queries/              # Queries    
    graphql/              # Route
    styles/               # Global styles (globals.css)
    types/                # TypeScript types (e.g., patient.ts)
    layout.tsx            # Main layout component
    page.tsx              # Main page component
public/                 # Public assets (e.g., images, icons)
node_modules/           # Node modules
```
