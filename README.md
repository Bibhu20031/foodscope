# Food Product Explorer

This is a React.js application built as part of a technical assignment. It allows users to search, filter, sort, and view details of food products using the OpenFoodFacts API. A barcode scanner is also included to fetch product data by scanning real-world product barcodes.

---

## Submission Details

- **Repository Name:** _Complies with rules — no mention of Adme/Truflect/Advertyzement_
- **Live Demo / GitHub Link:** 
- **Time Taken:** ~6 days (including debugging CORS issues, barcode integration, and API structure exploration)
- **README Includes:**
  - Project structure
  - Key decisions
  - Limitations faced
  - How to run and test locally

---

##  Features

-  **Search** by product name
-  **Filter** by category (e.g. dairy-products, beverages, snacks)
- ↕ **Sort** by product name or nutrition grade
-  **Barcode Scanner** (via webcam)
-  **Product Detail Page** with ingredients, nutrition, labels
-  **Responsive Design** with Tailwind CSS

---

##  Technologies Used

- ReactJS (with TypeScript)
- Tailwind CSS
- Context API for state management
- @zxing/browser (for barcode scanning)
- OpenFoodFacts API

---

## Limitations

### 1. CORS Restrictions
The OpenFoodFacts API doesn't support CORS, which leads to fetch failures when calling the API directly from the browser (especially in production or on some networks). This is a known issue from the API's side.

 This sometimes causes `Failed to fetch` or `Access-Control-Allow-Origin` errors when making API calls.

### 2. Infinite Scrolling Instability

I implemented **infinite scrolling** using an `IntersectionObserver` and paginated requests via `page=1, 2, 3...`.Hence didnt push.

However:

- Since CORS errors frequently block API calls,
- And the API rate-limits aggressively (especially if you scroll fast),

...this feature **breaks often** and doesn't work as intended in the deployed version. It does work intermittently during development.

The logic remains in the code to showcase the approach, but it's not fully reliable without a backend proxy (which was out of scope for this assignment).

---

##  How to Run Locally

```bash
git clone https://github.com/your-username/food-product-explorer.git
cd food-product-explorer
npm install
npm run dev
```
## Problems solved -
Managed global state with React Context API
Set up a functional barcode scanner using @zxing/browser

