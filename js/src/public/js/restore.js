const form = document.getElementById("passRestoreForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  try {
    const response = await fetch("/api/users/restore", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: ` Redirecting you to login.`,
        icon: "success",
        customClass: {
          popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
          confirmButton: "!bg-blue-600 !px-5",
          timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
        },
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          window.location.href = "/";
        },
      });
    } else {
      throw data;
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      html: `<strong class="text-bold">${error}</strong>`,
      icon: "error",
      timer: 5000,
      footer: "Reloading page on close",
      timerProgressBar: true,
      customClass: {
        popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
        confirmButton: "!bg-blue-600 !px-5",
        timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
      },
      willClose: () => {
        location.reload();
      },
    });
  }
});