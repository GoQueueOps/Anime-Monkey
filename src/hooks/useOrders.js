import { supabase } from '../lib/supabase';

export async function placeOrder({ form, cartItems, cartTotal, payment }) {
  const shipping = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + shipping;
  const orderId = 'AM' + Math.floor(100000 + Math.random() * 900000);

  const { data, error } = await supabase
    .from('orders')
    .insert([{
      order_id: orderId,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      payment_method: payment,
      items: cartItems.map(i => ({
        id: i.id,
        name: i.name,
        series: i.series,
        price: i.price,
        qty: i.qty,
        img: i.img,
      })),
      subtotal: cartTotal,
      shipping,
      total,
      status: 'confirmed',
    }])
    .select()
    .single();

  if (error) throw error;

  return { orderId, total, data };
}

export async function getOrder(orderId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_id', orderId)
    .single();

  if (error) throw error;
  return data;
}
