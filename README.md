## 🎫 MyTicket – Online Ticket Booking Platform

MyTicket is a modern, responsive ticket booking web application that allows users to browse and purchase tickets for events happening in **Malaysia**. The site supports dark mode, live event listings, and user interaction via a styled contact form. It uses **Node.js**, **Express**, **MongoDB**, and **EJS** for server-side rendering.

---

### 📌 Features

- 🔍 **Search Events** by name or date
- 🎟️ **Purchase Tickets** through a styled form
- 🗂️ **View Events** dynamically from MongoDB
- 🌙 **Dark Mode Toggle**
- 📧 **Contact Form** with live feedback message
- 📦 **Seed Script** to populate the database with placeholder Malaysian events

---

### 📁 Tech Stack

| Layer    | Technology                 |
| -------- | -------------------------- |
| Backend  | Node.js + Express          |
| Frontend | HTML, CSS, JavaScript, EJS |
| Database | MongoDB (Mongoose ODM)     |
| Styling  | CSS3 + Responsive Design   |

---

### 🚀 How to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/myticket.git
cd myticket
```

2. **Install dependencies**

```bash
npm install
```

3. **Start MongoDB**

Make sure you have MongoDB running locally (default URI: `mongodb://localhost:27017`).

4. **Seed the database**

```bash
node seed.js
```

This will populate your `tazkarti` database with sample Malaysian events.

5. **Run the app**

```bash
node app.js
```

6. **Visit in browser**

```bash
http://localhost:3000
```

---

### 📂 Project Structure

```
myticket/
│

├── views/
│   ├── index.ejs            # Homepage
│   ├── events.ejs           # Events listing
│   ├── about.ejs            # About page
│   ├── contact.ejs          # Contact page
│   ├── public/
│       └── styles/
│       └────────── main.css         # Global styling and dark mode
├── app.js                   # Main server file (Express app)
├── seed.js                  # Seed script to add dummy events
├── package.json
└── README.md
```

---

### 🛠 Contact Form Success Alerts

- When a message is submitted via the Contact page, the user receives a **success toast**.
- This is done using a URL query flag and JavaScript alert injection:

  ```js
  res.redirect("/contact?success=1");
  ```

---

### 🌄 Sample Event Titles in DB

- Coldplay Live in Kuala Lumpur
- Ramadan Bazaar Cyberjaya
- Penang Food Festival
- Malaysia Tech Expo
- Langkawi LIMA Maritime Show

> All events are Malaysia-based and styled with placeholder images from `via.placeholder.com`.

---

### 🔒 To Do / Optional Features

- [ ] Add authentication (user login)
- [ ] Add ticket inventory system
- [ ] Payment gateway integration
- [ ] Admin dashboard to manage events
- [ ] Email service for contact form

---

### 👤 Author

**Adham Walid**
📍 City University Malaysia
📧 [adhamwalid1990@hotmail.com](mailto:adhamwalid1990@hotmail.com)
🌐 [GitHub](https://github.com/AdhamWalid)

---
