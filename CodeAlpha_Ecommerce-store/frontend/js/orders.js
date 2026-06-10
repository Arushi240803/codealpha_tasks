document.addEventListener("DOMContentLoaded", () => {
  console.log("orders.js loaded ✔");

  const ordersContainer = document.getElementById("orders-container");
  const emptyState = document.getElementById("empty-orders");

  if (!ordersContainer) {
    console.error("orders-container NOT FOUND");
    return;
  }

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        ordersContainer.innerHTML = "<h3>Please login first</h3>";
        return;
      }

      const res = await fetch(`${BASE_URL}/orders/myorders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("ORDERS RESPONSE:", data);

      if (!res.ok) {
        ordersContainer.innerHTML = `<h3>${data.message}</h3>`;
        return;
      }

      if (!Array.isArray(data)) {
        ordersContainer.innerHTML = "<h3>Invalid response from server</h3>";
        return;
      }

      renderOrders(data);
    } catch (err) {
      console.log("ERROR:", err);
      ordersContainer.innerHTML = "<h3>Server error</h3>";
    }
  };

  // CANCEL ORDER
  const cancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      alert(data.message || "Order cancelled");

      fetchOrders(); // refresh list
    } catch (err) {
      console.log("CANCEL ERROR:", err);
    }
  };

  // RENDER ORDERS
  const renderOrders = (orders) => {
    ordersContainer.innerHTML = "";

    if (!orders.length) {
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    orders.forEach((order) => {
      const div = document.createElement("div");
      div.className = "order-card";

      let itemsHTML = "";

      if (order.orderItems && order.orderItems.length) {
        order.orderItems.forEach((item) => {
          itemsHTML += `<p>${item.name} × ${item.quantity}</p>`;
        });
      }

      div.innerHTML = `
        <h3>Order ID: ${order._id}</h3>

        ${itemsHTML}

        <h4>Total: ₹${order.totalPrice}</h4>

        <button class="cancel-btn" data-id="${order._id}">
          Cancel Order
        </button>
      `;

      ordersContainer.appendChild(div);
    });

    // attach events after rendering
    document.querySelectorAll(".cancel-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        cancelOrder(btn.dataset.id);
      });
    });
  };

  fetchOrders();
});