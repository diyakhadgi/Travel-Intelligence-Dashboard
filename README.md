# Travel-Intelligence-Dashboard 🌦️💱

A simple React application to get current weather information and currency conversion for a selected city. Built using OpenWeatherMap API and ExchangeRate API.

---

## 🔧 Setup Instructions

1. **Clone the repository**
```
git clone https://github.com/diyakhadgi/Travel-Intelligence-Dashboard
cd Travel-Intelligence-Dashboard
```

2. **Install dependencies**
```
npm install
```

3. **Create a .env file**
Create a `.env` file in the root directory and add your API keys:

```
VITE_API_KEY=your_openweather_api_key
VITE_CURRENCY_API=your_currency_api_key
```


4. **Run the app**
```
npm run dev
```

Open your browser at: [http://localhost:5173](http://localhost:5173)

---


## 💡 Approach

- Used **React** with **Vite** for fast development.
- Weather data is fetched using the **OpenWeatherMap API** based on selected city.
- Currency conversion uses **ExchangeRate API**.
- Implemented localStorage support for offline caching.
- Clean and responsive UI built using basic CSS.

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── SearchCity.jsx
│   ├── Weather.jsx
│   └── CurrencyConverter.jsx
├── App.jsx
├── main.jsx
└── ...
```

---

### 🖥️ Screenshots

![alt text](/src/assets/image.png)
![alt text](/src/assets/image-1.png)
![alt text](/src/assets/image-2.png)
![alt text](/src/assets/image-3.png)

## 📸 Video Demo
https://drive.google.com/file/d/1Ug9j5d8qZoeI1CBRFGh2L0nYtoB2IYJ0/view?usp=sharing

---