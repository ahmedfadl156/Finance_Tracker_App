💰 Budget Planner: Your Personal Finance Tracker

Welcome to the Budget Planner! This is a clean, intuitive web application designed to help you easily track your personal income and expenses, providing a clear overview of your financial health. Built with modern web technologies, it offers a seamless experience for managing your money.

✨ Features
Add Transactions: Quickly add new income 💸 or expense 💳 entries with descriptions and amounts.

Dynamic Summary: Instantly view your total balance, total income, and total expenses. The balance updates in real-time and changes color (green for positive, red for negative)! 📈

Transaction History: See a detailed list of all your financial movements, neatly categorized into "Income" and "Expenses" tabs. 📋

Delete Transactions: Easily remove any entry from your history with a single click. 🗑️

Data Persistence: All your transactions are saved locally in your browser's localStorage, so your data remains even after closing and reopening the app. 💾

Financial Overview Chart: A dynamic bar chart visualizes your income versus expenses, giving you a quick visual insight into your financial flows. 📊

Responsive Design: Enjoy a consistent and user-friendly experience across various devices (desktop, tablet, mobile). 📱💻

🚀 Technologies Used
HTML5: For the core structure of the web application.

Tailwind CSS: For rapid and responsive UI development, ensuring a modern and clean look. 🎨

JavaScript (Vanilla JS): The brain behind the app, handling all the logic, DOM manipulation, data management, and interactions. 🧠

Chart.js: A powerful JavaScript charting library used to create the interactive financial overview chart. 📊

Font Awesome: For sleek and intuitive icons (like the trash can and percentages). ✨

💻 How to Use
To get this project up and running on your local machine:

Clone the Repository:

git clone https://github.com/ahmedfadl156/Finance_Tracker_App.git
cd Finance_Tracker_App/public

Open in Browser:

Simply open the index.html file in your web browser.

Recommended (for full localStorage functionality): Use a local HTTP server. If you have Node.js installed, you can do this:

# If not already installed globally
npm install -g http-server
# Then, from within the 'public' directory of your project:
http-server

This will typically serve the app on http://127.0.0.1:8080.

Start Tracking!

Add descriptions, amounts, and select the type (Income or Expense).

Click "Add Transaction".

Watch your summary and transaction history update!

Test the delete button and see the chart react!

📂 Project Structure
budget-planner/
├── public/
│   ├── index.html          # Main application HTML file
│   ├── style.css           # Tailwind CSS output (or linked via CDN)
│   ├── script.js           # All JavaScript logic for the app
│   └── images/             # Placeholder for any images (e.g., logo)
├── .gitignore              # Specifies intentionally untracked files to ignore
├── package.json            # Node.js project configuration (if using npm for Tailwind build)
├── tailwind.config.js      # Tailwind CSS configuration (if using npm for Tailwind build)
└── README.md               # This file!

💡 Future Enhancements (Ideas for further development)
Edit Transactions: Add functionality to modify existing transactions. ✍️

Categorization: Allow users to categorize expenses (e.g., Food, Transport, Entertainment). 🏷️

Filtering & Sorting: Implement options to filter transactions by date, type, or category, and sort them. 🔄

Monthly/Yearly Reports: Generate more detailed financial reports. 📊

User Authentication: Allow multiple users to manage their budgets. 🔐

Cloud Storage: Integrate with a backend service (e.g., Firebase Firestore) for cloud data storage. ☁️

👨‍💻 Author
Ahmed Fadl

GitHub Profile 🐙

Happy Budgeting! 🚀
