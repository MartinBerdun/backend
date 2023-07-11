export const emailTemplate = {
    passwordRestoreEmail: (email, name, token) => `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Password Restore</title>
    </head>
    <body>
        <p>Password Restore for ${email}</p>
          
          <div>
          Dear ${name},
          <br><br>
          To reset your password, please click on the link below:
          <br><br>
          <a href="http://localhost:8080/resetPassword?token=${token}" target="_blank">Reset Password</a>
          <br><br>
          This link will be valid for 1 hour. Please, remember to set a different password from the one you had before.
          <br><br>
          <br><br>
          Best regards,
          <br>
          </div>
    </body>
    </html>
    `,
}