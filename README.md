# Fashion E-commerce Starter (Medusa v2)

Fashion E-commerce Starter is a modern and fully customizable e-commerce template built with Medusa 2.0.
Inspired by the sustainable furniture brand Sofa Society, this project demonstrates how Medusa v2 can power elegant, personalized, and sustainable online shopping experiences.

### **Overview**

This starter provides a complete foundation for building a fashion or lifestyle e-commerce store.
It includes a stylish desktop UI, dynamic product configuration, collection management, and an integrated checkout flow.

Built using Next.js 15.5.6 (App Router) and Tailwind CSS, it’s fast, extendable, and developer-friendly.

### **Features**

Dynamic Materials & Colors: Add customizable materials and color options with automatic price updates<br>
Editable Collections: Easily manage and personalize collection pages and images<br>
Inspiration Page: Showcase real-life product settings and trends<br>
About Page: Present your brand’s mission and sustainability values<br>
Stripe Integration: Accept secure online payments via Stripe<br>
Complete Store Flow: Product listings, cart, checkout, and order confirmation<br>
Filtering - by category, collection<br>
Sorting - by price, latest additions<br>
Customer accounts and order history<br>

Next.js 15 + Tailwind CSS: High performance, flexible architecture
Medusa 2.10 Backend: Reliable, open-source commerce engine

### **To-Do List**<br>
Meilisearch integration<br>
Automated Email communication<br>
Responsive design for tablet and phone compatibility<br>

# Website overview<br>
### **Home Page**<br>
![Screenshot_1](https://github.com/user-attachments/assets/5f504cff-cd5f-42a6-b15d-f78275cb2ac5)

### **Collections**
![Screenshot_2](https://github.com/user-attachments/assets/f93027b9-3752-415a-add4-5bab3457d2dc)

### **Product Details**
![Screenshot_4](https://github.com/user-attachments/assets/21a2a4f9-4195-403e-907b-a57ae38d2321)

### **Cart**
![Screenshot_8](https://github.com/user-attachments/assets/022b0ef5-722d-4d5a-86b8-b10bd868ade2)
![Screenshot_6](https://github.com/user-attachments/assets/c928172f-a2c1-47fe-98ff-03edcae35d67)

### **Checkout & Review**
![Screenshot_9](https://github.com/user-attachments/assets/23fcfb74-8e3b-4b31-8af2-72ad876d1d70)
![Screenshot_10](https://github.com/user-attachments/assets/abca7af4-9836-45c9-b33e-1968c26b65a3)

### **Personal & Order History**
![Screenshot_11](https://github.com/user-attachments/assets/3c78ecd1-b3d8-424c-a130-0a1475d90d19)
![Screenshot_12](https://github.com/user-attachments/assets/1aee4f0e-bd7c-4b3d-8dbc-4dce089c97c7)


### **Requirements**<br>
Node.js ≥ 20<br>
Yarn ≥ 3.5 for Medusa, Yarn v1 for Storefront<br>
Docker & Docker Compose<br>

# **Quickstart**
git clone git@github.com:aljinovic-ante/SofaSocietyCo.git

### Reach backend
cd medusa-backend

### Create .env file
cp .env.template .env

### Install dependencies
yarn

### Start db
docker-compose up -d

### Build the project
yarn build

### Run migrations
yarn medusa db:migrate

### Seed database
yarn seed

### Create an admin user
yarn medusa user -e "admin@medusa.local" -p "supersecret"

### Start the server
yarn dev

Access server at http://localhost:9000/app with created user.<br> Go to http://localhost:9000/app/settings/publishable-api-keys, copy the publishable key and paste it into  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY env variable in the storefront/.env.local file.<br>
Set System as Tax Provider for Croatia In Medusa Admin:
1. go to settings
2. Tax regions
3. Click on Croatia
4. Add System as Tax Provider (three dots next to No default rate, edit, add...)

<br>

# Storefront
cd medusa-storefront

### Create the .env.local file
cp .env.template .env.local

### Install dependencies
yarn

### Start the server
yarn dev

Access storefront at http://localhost:8000.


### **Project evaluation**  
This was my first time working with the Medusa platform.<br>
At times, it was quite challenging to understand the Medusa Admin UI and the way it handles data and requests - especially during the user authentication phase and the order placement process.<br>
Both of these issues were eventually solved successfully. I would say that, as expected, the more time I spent working with Medusa, the better I understood it.<br>
I still have some work to do, such as integrating automated email services for sending password reset links, order receipts, and other similar notifications.<br>
I managed to send an automated email successfully, but I haven’t yet implemented all related features.<br>
Then, of course, there’s always some polishing to do and potential bugs to fix.<br>
The total development time is estimated at around 30–35 hours.

### **Tech Stack**<br>
Medusa 2.10<br>
Next.js 15.5 (App Router)<br>
Tailwind CSS<br>
Docker<br>
Yarn<br>
Stripe<br>


