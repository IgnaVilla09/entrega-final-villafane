document.addEventListener("DOMContentLoaded", () => {

  const addToCartButtons = document.querySelectorAll("#btn-add");
  const removeAllitems = document.querySelectorAll(".remove-all-items");
  const removeItem = document.querySelectorAll(".remove-item");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {

      e.preventDefault()

      const cartId = await obtenerElIdDelCarrito();
      const productId = obtenerElIdDelProducto(button);

      try {
        const response = await fetch(`/api/carts/${cartId}/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          const data = await response.json();
          alert("Producto agregado al carrito correctamente")
        } else {
          const errorData = await response.json();
          alert(errorData.error)
        }
      } catch (error) {
        alert("Error al enviar la solicitud:", error);
      }
    });
  });

  removeAllitems.forEach((button) => {
    button.addEventListener("click", async (event) => {

      event.preventDefault()

      const cartId = event.target.getAttribute("data-cart-id");

      try {
        const response = await fetch(`${cartId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Carrito vacío!");
          location.reload();
        } else {
          alert("CARRITO NO VACÍO");
        }
      } catch (error) {
        console.error("Error:" + error);
        alert("CARRITO NO VACIÓ, ALGO SALIO MAL: " + error);
      }
    });
  });

  removeItem.forEach((button) => {
    button.addEventListener("click", async (event) => {

      event.preventDefault()

      const cartId = event.target.getAttribute("data-cart-id-item");
      const productId = event.target.getAttribute("data-producto-id-item");

      try {
        const response = await fetch(`${cartId}/products/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Producto eliminado satisfactoriamente");
          location.reload();
        } else {
          alert("Error al eliminar producto");
        }
      } catch (error) {
        alert("Algo salio mal en la petición DELETE: " + error);
      }
    });
  });

  async function obtenerElIdDelCarrito() {
    const response = await fetch(`api/sessions/current`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.cartId;
  }

  function obtenerElIdDelProducto(button) {
    return button.dataset.productId;
  }
});
