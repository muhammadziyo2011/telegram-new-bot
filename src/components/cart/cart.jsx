import Button from '../button/button';
import { totalPrice } from '../units/total-price';
import './cart.css';

const Cart = ({ cartItems, onCheckout }) => {
  return (
    <div className="cart_container">
      <p>Umumiy narx: {totalPrice(cartItems).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</p>
      <Button 
        title={`${cartItems.length === 0 ? "Buyurtma berish" : "To'lov"}`} 
        disabled={cartItems.length === 0 ? true : false}
        type={'checkout'}
        onClick={onCheckout}
        />
    </div>
  );
};

export default Cart;