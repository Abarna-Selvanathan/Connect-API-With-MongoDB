const form = document.querySelector('.orderForm');
const tableBody = document.querySelector('tbody');
const API_URL = 'http://localhost:3000/api/admin';
const fetchOrder = async () => {
  try {
    const response = await fetch(API_URL);
    const devices = await response.json();
    tableBody.innerHTML = '';
    devices.forEach((order) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order.customerName}</td>
        <td>${order.productName}</td>
        <td>${order.budget}</td>
        <td>${order.location}</td>
        <td>${order.deliveryDate}</td>
        <td class="btn"><button data-id="${order._id}" class="edit-btn">Edit</button><button data-id="${order._id}" class="delete-btn">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching devices:', error);
  }
};
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputs = form.querySelectorAll('input');
  const deviceData = {
    customerName: inputs[0].value,
    productName: inputs[1].value,
    budget: inputs[2].value,
    location: inputs[3].value,
    deliveryDate: inputs[4].value,
  };
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviceData),
    });
    if (response.ok) {
      alert('Order added successfully!');
      form.reset();
      fetchOrder();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error adding order:', error);
  }
});
tableBody.addEventListener('click', async (event) => {
  const orderId = event.target.getAttribute('data-id');
  if (event.target.classList.contains('delete-btn')) {
    const confirmDelete = confirm('Are you sure you want to delete this order?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/${orderId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Order deleted successfully!');
          fetchOrder();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  }
  if (event.target.classList.contains('edit-btn')) {
    try {
      const response = await fetch(`${API_URL}/${orderId}`);
      const order = await response.json();
      const inputs = form.querySelectorAll('input');
      inputs[0].value = order.customerName;
      inputs[1].value = order.productName;
      inputs[2].value = order.budget;
      inputs[3].value = order.location;
      inputs[4].value = order.deliveryDate;
      form.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const updatedOrderData = {};
        formData.forEach((value, key) => {
          updatedOrderData[key] = value;
        });
        try {
          const updateResponse = await fetch(`${API_URL}/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedOrderData),
          });
          if (updateResponse.ok) {
            alert('Order updated successfully!');
            form.reset();
            fetchOrder();
            form.onsubmit = null;
          } else {
            const errorData = await updateResponse.json();
            alert(`Error: ${errorData.error}`);
          }
        } catch (error) {
          console.error('Error updating order:', error);
        }
      };
    } catch (error) {
      console.error('Error fetching order for editing:', error);
    }
  }
});
fetchOrder();



