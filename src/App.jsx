import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/card';
import Cart from './components/cart/cart';
import { getData } from './constants/db';

const courses = getData();
const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    telegram.ready(); // Telegram WebAppni tayyorlash
  }, []);

  const onAddItem = (item) => {
    const existItem = cartItems.find(c => c.id === item.id);

    if (existItem) {
      const newData = cartItems.map(c =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity + 1 }
          : c
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItem = (item) => {
    const existItem = cartItems.find(c => c.id === item.id);

    if (existItem.quantity === 1) {
      const newData = cartItems.filter(c => c.id !== item.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map(c =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c
      );
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish 🙂";
    telegram.MainButton.show();
  };

  const onSendData = () => {
    const data = cartItems.map(({ id, title, Image, quantity }) => ({
      id,
      title,
      Image,
      quantity
    }));
    telegram.sendData(JSON.stringify(data));
  };

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [cartItems]);

  return (
    <>
      <h1 className="heading">Sammi kurslar</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {courses.map(course => (
          <Card
            key={course.id}
            course={course}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </>
  );
};

export default App;