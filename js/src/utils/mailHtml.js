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

newTicketEmail: (purchaser, code, purchase_datetime, ammount) => `
          <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>Order Confirmation</title>
            </head>
            <body>
            <table>
            <tr>
            <td align="center" bgcolor="#f7f7f7">
            <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse: collapse;">
            <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
                <tr>
                  <td style="color: #333333; font-family: Arial, sans-serif; font-size: 24px;">
                    Order Confirmation
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 30px 0; color: #333333; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    Dear ${purchaser},
                    <br><br>
                        Your order has been successfully created
                    <br><br>
                    Order Details:
                    <ul>
                      <li>Order Number: ${code}</li>
                      <li>Order Date: ${purchase_datetime}</li>
                      <li>Order Total: ${ammount}</li>
                    </ul>
                    <br>
                  </td>
                </tr>
              </table>
            </td>
            </tr>
            <tr>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body>
            </html>
          `,
deletedUser: (user, email) => `
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="UTF-8">
          <title>Account Deletion Notification</title>
          </head>
          <body>
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
          <td >
          <table >
          <tr>
          <td>
            <table>
              <tr>
                <td >
                  Account Deletion Notification
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 0 30px 0; color: #333333; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  Dear ${user},
                  <br><br>
                 Your account with email ${email} has been deleted due to having more than 2 days of inactivity.
                  
                </td>
              </tr>
            </table>
          </td>
          </tr>
          <tr>
          </tr>
          </table>
          </td>
          </tr>
          </table>
          </body>
          </html>
          `,
}