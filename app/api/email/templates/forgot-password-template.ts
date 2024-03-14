// this template is used to help users reset their password
export const forgotPasswordTemplate = `
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>LinkChop Email</title>
  </head>
  <body style="background:rgb(251,252,253);padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; margin: 0; -ms-text-size-adjust: 100%;">
    <center>
      <table cellpadding="8" cellspacing="0" style="width: 540px; padding: 0; width: 100% !important; margin: 0; background-color:rgb(249,249,249);" border="0">
        <tr>
          <td valign="top">
            <table cellpadding="0" cellspacing="0" style="border-radius: 4px; -webkit-border-radius: 4px; border: 1px #eeeeee solid; -moz-border-radius: 4px;background-color:#ffffff" border="0" align="center">
              <tr>
                <td colspan="3" height="6"></td>
              </tr>
              <tr style="line-height: 20px;">
                <td width="100%" style="font-size: 14px;" align="center" height="1">
                  <div class="brand" style="padding:10px 0" id="brand"><img style='width:80px' src="https://linkchop.com/icons/logo.png" /></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 10px;">
                  <table cellpadding="0" cellspacing="0" style="line-height: 25px;" border="0" align="center">
                    <tr>
                      <td colspan="3" height="30"></td>
                    </tr>
                    <tr>
                      <td width="36"></td>
                      <td width="454" align="left" style="color:#444444; border-collapse:collapse; font-size: 11pt; font-family: 'Helvetica Neue', Arial, Helvetica, 'sans-serif'; max-width: 454px;" valign="top">
                      <p>Hello,</p>
                      <p>You have requested to reset your password.</p>
                      <p>Please use the below link to reset your password:</p>
                      <a href="https://linkchop.com/auth/password-reset?id={id}&email={email}">https://linkchop.com/auth/password-reset</a>
                      <br />
                      <p>Do not share this link with anyone!</p>
                      <br />
                      <div>Best regards,</div>
                      <div>Colin from the LinkChop Team</div>
                      <div>colin@linkchop.com</div>
                      </td>
                      <td width="36"></td>
                    </tr>
                    <tr>
                      <td colspan="3" height="36"></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" align="center" border="0">
              <tr>
                <td height="10"></td>
              </tr>
              <tr>
                <td style="padding: 0; border-collapse: collapse;">
                  <table cellpadding="0" cellspacing="0" align="center" border="0">
                    <tr style="color: #a8b9c6; font-size: 11px; font-family: proxima_nova, 'Open Sans', 'Helvetica Neue', Arial, Helvetica, 'sans-serif'; -webkit-text-size-adjust: none;">
                      <td width="400" align="left"></td>
                      <td width="128" align="right">© 2024 LinkChop</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`
