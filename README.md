# 🛠️ Platform Admin Site - Lashess by Prii

Welcome to the **Lashess by Prii Admin Panel**! This platform allows administrators to manage bookings, salon services, e-commerce products, customer interactions, and analytics.

---

## 🚀 Features

- **📅 Booking Management** – View, edit, and approve customer appointments.
- **🛒 E-commerce Management** – Add, update, and track beauty products.
- **📊 Analytics Dashboard** – Gain insights into bookings and sales.
- **👥 User Management** – Manage customers and staff accounts.
- **📌 Promotions & Discounts** – Create and apply special offers.
- **⚙️ Settings & Configurations** – Customize salon details and services.

---

## 🔧 Tech Stack

- **Frontend:** React.js / Next.js
- **Backend:** Django (REST API)
- **Database:** PostgreSQL
- **Authentication:** Firebase / AWS Cognito
- **Hosting:** AWS Amplify / Vercel

---

## 📦 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/yourusername/lashess-admin.git
cd lashess-admin
```

### **2️⃣ Install Dependencies**

For **Frontend (Next.js):**

```sh
cd frontend
npm install
```

For **Backend (Django API):**

```sh
cd backend
pip install -r requirements.txt
```

---

## ▶️ Running the Project

### **Frontend (Next.js)**

```sh
npm run dev
```

- App will be available at **`http://localhost:3000`**.

### **Backend (Django)**

```sh
python manage.py runserver
```

- API will be available at **`http://localhost:8000/api/`**.

---

## 🔒 Environment Variables

Create a `.env` file in the respective folders:

### **Frontend `.env`**

```ini
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
```

### **Backend `.env`**

```ini
DJANGO_SECRET_KEY=your_django_secret_key
DATABASE_URL=postgres://your_db_credentials
CLOUD_ACCESS_KEY_ID=your_aws_key
CLOUD_SECRET_ACCESS_KEY=your_aws_secret
```

---

## 🏭 Deployment

### **Frontend**

Deploy using **Vercel**:

```sh
vercel deploy
```

Or using **AWS Amplify**:

1. Connect repo to AWS Amplify.
2. Configure build settings.
3. Deploy.

### **Backend**

Deploy using **AWS EC2 / Elastic Beanstalk**:

```sh
eb deploy
```

Or using **Docker**:

```sh
docker build -t lashess-backend .
docker run -p 8000:8000 lashess-backend
```

---

## 🔍 Testing

### **Run Unit Tests**

For Frontend:

```sh
npm test
```

For Backend:

```sh
pytest
```

---

## 🐝 API Documentation

- Swagger available at: **`http://localhost:8000/swagger/`**
- GraphQL API (if applicable): **`http://localhost:8000/graphql/`**

---

## 👨‍💻 Contributors

- **Your Name** – [GitHub](https://github.com/yourusername)
- **Other Contributors** – [GitHub](https://github.com/otherusername)

---

## 📞 Support

For issues or feature requests, open a ticket in [GitHub Issues](https://github.com/yourusername/lashess-admin/issues).

---

### 🏆 **Thank You for Using Lashess by Prii Admin!**
