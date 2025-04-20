# 🛒 Modern E-Commerce Web App

A responsive full-stack ecommerce platform built with **Next.js App Router**, **Stripe**, **Inngest**, **Cloudinary**, **Clerk Authentication**, **MongoDB**, and **Tailwind CSS**. Customers can browse products, authenticate securely, and complete payments using Stripe. Sellers can upload 
products, delete products, view orders and see all products.

## 🚀 Features

- ✅ User authentication via Clerk  
- 🛍️ Product browsing and categorization  
- 📦 Shopping cart management  
- 💳 Inline Stripe payment integration  
- 🔐 Secure backend routes for order and payment management  
- 📄 Order history  
- 🌐 SEO optimization for better visibility  
- 📱 Fully responsive design  
- 📄 Seller/Admin Dashboard

> 🧠 **Note**: The seller's role is configured from clerk. <br />
- From dashboard, select `Users`
- Select preferred user email
- Under `Metadata` edit `Public` and set:
```
{
"role": "seller"
}
```
- save
- Log in to the application with the seller's email to see the seller's dashboard

---

## 🧰 Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS  
- **Backend**: Node.js (API routes), Stripe  
- **Authentication**: Clerk  
- **Database**: MongoDB 
- **HTTP Client**: Axios  
- **Image Storage**: Cloudinary

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ivioje/nextjs-ecommerce.git
cd nextjs-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_CURRENCY=$
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_url
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_EVENT_KEY=your_inngest_event_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

> 🧠 **Note**: These keys are available in their respective dashboards.

---

### 4. Run the Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 💳 Stripe Integration Overview

- The frontend uses Stripe Elements and `axios` to create payment intents.  
- The backend API route (`/api/stripe/create-payment-intent`) receives the amount and returns a client secret.  
- Payments are confirmed on the frontend using Stripe Elements and the `clientSecret`.  

---

## 🔒 Authentication

- Clerk handles user login, registration, and session management.  
- Protected routes are implemented using `getAuth()` from `@clerk/nextjs/server`.

---

## ✅ To-Do / Improvements

- [ ] Add PayPal as an alternative payment method  
- [ ] Product reviews and ratings  
- [ ] Email notifications with Resend  
- [ ] Real-time order tracking

---

## 🧑‍💻 Contributing

Feel free to fork this repository, open issues, or submit pull requests.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

