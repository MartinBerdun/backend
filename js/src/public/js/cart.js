const deleteButton = document.getElementById("buttonDelete");
const createTicket = document.getElementById("createTicket");

const cartId = document.getElementById('cartId').textContent;
const removeFromCart = document.querySelectorAll(
    '[id^="removeFromCartForm-"]'
  )

removeFromCart.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const productId = form.getAttribute('id').split('-')[1]
      /* const prodTitle = form
        .closest('.max-w-4xl')
        .querySelector('h5').textContent */

      console.log({productId});
  
      try {
        const response = await fetch(
          `/api/carts/${cartId}/product/${productId}`,
          { method: 'DELETE' }
        )
        const data = await response.json()
  
        if (response.ok) {
          Swal.fire({
            title: 'Product removed from cart!',
            text: `You removed ${prodTitle} from the cart`,
            toast: true,
            position: 'top-right',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
            willClose: () => {
              location.reload()
            }
          })
        } else {
          throw data
        }
      } catch ({ error }) {
        Swal.fire({
          title: 'Error!',
          html: `<strong class="text-bold">${error}</strong>`,
          icon: 'error',
          timer: 5000,
          timerProgressBar: true,
          willClose: () => {
            location.reload()
          }
        })
      }
    })
  })

createTicket.addEventListener('click', async (e) => {
  e.preventDefault()

  try {
      const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST'}
      )
      const data = await response.json()

      if (response.ok) {
        const {
          payload: { code, purchaser }
        } = data

        Swal.fire({
          title: 'Successful order!',
          html: `
              Your purchase code is:<br>
              <strong>${code}</strong><br><br>
              Details were sent to ${purchaser}`,
          icon: 'success',
          timer: 5000,
          timerProgressBar: true,
          willClose: () => {
            window.location.href = "/products"}
        })
      } else {
        throw data
      }
  } catch ({ error }) {
    Swal.fire({
      title: 'Error!',
      html: `<strong class="text-bold">${error}</strong>`,
      icon: 'error',
      timer: 5000,
      timerProgressBar: true,
      willClose: () => {
        location.reload()
      }
    })
  }
})