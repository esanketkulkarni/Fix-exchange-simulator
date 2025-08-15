async function fetchBook() {
  const res = await fetch('/orders');
  const book = await res.json();
  document.getElementById('book').textContent = JSON.stringify(book, null, 2);
}

document.getElementById('order-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const order = {
    type: form.type.value,
    price: parseFloat(form.price.value),
    quantity: parseInt(form.quantity.value, 10),
  };
  await fetch('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  form.reset();
  fetchBook();
});

fetchBook();
