  const deleteUserButtons = document.querySelectorAll('[id^="deleteUser-"]')
  
  const deleteInactiveUsers = document.getElementById('deleteInactiveUsers')
  
  deleteUserButtons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      e.preventDefault()
      const cartId = button.getAttribute('id').split('-')[1]
        button.previousElementSibling.querySelector('h3').textContent
  
      try {
        const response = await fetch(`/api/users/${cartId}`, {
          method: 'DELETE'
        })
        const data = await response.json()
  
        if (response.ok) {
          Swal.fire({
            title: 'User successfully deleted!',
            toast: true,
            icon: 'success',
            timer: 3000,
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
  
  deleteInactiveUsers.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users/inactive', {
        method: 'DELETE'
      })
      const data = await response.json()
  
      if (response.ok) {
        Swal.fire({
          title: 'Inactive users deleted!',
          toast: true,
          position: 'top-right',
          icon: 'success',
          timer: 3000,
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