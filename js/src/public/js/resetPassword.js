const form = document.getElementById("passRestoreForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  const newPasswords = Object.values(obj);
  const matches = newPasswords.every((el) => el === newPasswords[0]);

  if (matches) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      obj["token"] = token;

      const response = await fetch("/api/users/resetPassword", {
        method: "PUT",
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
    } catch ({ error }) {
      Swal.fire({
        title: "Error!",
        html: `<strong class="text-bold">${error}</strong>`,
        icon: "error",
        timer: 4000,
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
  } else {
    errorSwal("Passwords don't match. Please try again.");
  }
});