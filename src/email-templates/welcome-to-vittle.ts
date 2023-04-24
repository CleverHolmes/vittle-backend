interface WelcomeEmailProps {
  firstName: String;
  activityId: String;
  language: String;
}

export default function welcomeToVittle(emailData: WelcomeEmailProps) {
  const welcomeFrench = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <title>Bienvenue à Vittle, ${emailData.firstName}</title>

    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      table {
        border-spacing: 0;
      }
      table td {
        border-collapse: collapse;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      .ReadMsgBody {
        width: 100%;
        background-color: #ebebeb;
      }
      table {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      .yshortcuts a {
        border-bottom: none !important;
      }
      @media screen and (max-width: 680px) {
        .force-row,
        .container {
          width: 95% !important;
          max-width: 95% !important;
        }
      }
      @media screen and (max-width: 680px) {
        .logo {
          float: left;
          display: inline-block;
          margin-left: 0px !important;
        }
      }
      @media screen and (max-width: 680px) {
        .header-text {
          float: left !important;
          width: calc(100% - 70px) !important;
        }
      }
      @media screen and (max-width: 450px) {
        .logo,
        .header-text {
          float: none !important;
        }
      }
      @media screen and (max-width: 450px) {
        .header-text {
          width: 100% !important;
        }
      }
      @media screen and (max-width: 450px) {
        .container-padding {
          padding-left: 20px !important;
          padding-right: 20px !important;
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
      }
      @media screen and (max-width: 450px) {
        .call-to-action {
          padding-top: 20px !important;
          margin-top: 20px !important;
        }
      }
      @media screen and (max-width: 450px) {
        .logo {
          width: 100px;
          height: auto;
          margin-right: 0px !important;
          margin-left: 0px !important;
        }
      }
      .ios-footer a {
        color: #aaaaaa !important;
        text-decoration: underline;
      }

      .link:hover {
        color: inherit;
      }
    </style>
  </head>

  <body
    style="margin:0; padding:0;"
    bgcolor="#ffffff"
    leftmargin="0"
    topmargin="0"
    marginwidth="0"
    marginheight="0"
  >
    <table
      border="0"
      width="100%"
      height="100%"
      cellpadding="0"
      cellspacing="0"
      bgcolor="#ffffff"
    >
      <tr>
        <td
          align="center"
          valign="top"
          bgcolor="#ffffff"
          style="background-color: #ffffff;"
        >
          <br />
          <!-- 600px container (white background) -->
          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
            style="width:600px;max-width:600px;"
          >
            <tr>
              <td
                class="container-padding header"
                align="left"
                style="padding-top:40px; padding-bottom: 0;"
              >
                <div style="width: 100%">
                  <a href="${process.env.HOST}/tracker/${emailData.activityId}?track=vittleLogoClick&redirect=https://www.vittle.ca">
                    <img
                      class="logo"
                      style="display: block;"
                      width="100"
                      src="https://www.vittle.ca/Vittle-Email-Logo.png"
                      alt="Vittle"
                    />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td
                class="container-padding content"
                align="left"
                style="padding-top:0px;padding-bottom:0;background-color:#ffffff"
              >
                <div
                  mc:edit="body"
                  class="body-text"
                  style="font-family:Helvetica, Arial, sans-serif;font-size:18px;line-height:26px;text-align:left; color:#333333;"
                >
                  <p style="margin-bottom: 32px;">
                    Bonjour ${emailData.firstName},
                  </p>
                  <!-- 
                  <p style="margin-bottom: 32px;">
Crée un mot de passe pour commencer à utiliser ton compte Vittle et pour confirmer que tu veux utiliser
 ${emailData.email} comme email de contact et nom d'utilisateur pour Vittle.
                  </p> -->

                  <a
                    href="${process.env.HOST}/tracker/${emailData.activityId}?track=setPasswordButtonClick&redirect=https://www.vittle.ca"
                    style="border-radius:3px;font-size:18px;margin:0 0 32px 0;display:inline-block;padding:0.8em 1.6em;font-size: 16px;
                    background-color: #fee173;text-decoration:none; color: #333; font-weight: 600;"
                  >
                    Créer mon mot de passe
                  </a>
                </div>
              </td>
            </tr>
          </table>

          <!--/600px container -->
          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
          >
            <tr>
              <td
                class="container-padding footer-text"
                align="left"
                style="font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:19px;color:#aaaaaa;padding-top:20px; border-top: 1px solid #ddd"
              >
                <p style="margin-bottom: 6px; margin-top: 0">
                  Bon appétit !
                </p>
                <p style="margin-bottom: 4px; margin-top: 0;">
                  Vittle, 1160, rue Heron, Ottawa (ON) K1V6B2
                </p>
                <p style="margin-bottom: 4px; margin-top: 0;">
                  <a href="#" style="color: inherit" class="link"
                    >Préférences de notification</a
                  >
                </p>
                <img src="${process.env.HOST}/tracker/${emailData.activityId}?track=emailOpen" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!--/100% background wrapper-->
  </body>
</html>
`;

  const welcomeEnglish = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <title>Welcome to Vittle, ${emailData.firstName}</title>

    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      table {
        border-spacing: 0;
      }
      table td {
        border-collapse: collapse;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      .ReadMsgBody {
        width: 100%;
        background-color: #ebebeb;
      }
      table {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      .yshortcuts a {
        border-bottom: none !important;
      }
      @media screen and (max-width: 680px) {
        .force-row,
        .container {
          width: 95% !important;
          max-width: 95% !important;
        }
      }
      @media screen and (max-width: 680px) {
        .logo {
          float: left;
          display: inline-block;
          margin-left: 0px !important;
        }
      }
      @media screen and (max-width: 680px) {
        .header-text {
          float: left !important;
          width: calc(100% - 70px) !important;
        }
      }

      @media screen and (max-width: 450px) {
        .logo,
        .header-text {
          float: none !important;
        }
      }
      @media screen and (max-width: 450px) {
        .header-text {
          width: 100% !important;
        }
      }
      @media screen and (max-width: 450px) {
        .container-padding {
          padding-left: 20px !important;
          padding-right: 20px !important;
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
      }
      @media screen and (max-width: 450px) {
        .call-to-action {
          padding-top: 20px !important;
          margin-top: 20px !important;
        }
      }
      @media screen and (max-width: 450px) {
        .logo {
          width: 100px;
          height: auto;
          margin-right: 0px !important;
          margin-left: 0px !important;
        }
      }
      .ios-footer a {
        color: #aaaaaa !important;
        text-decoration: underline;
      }

      .link:hover {
        color: inherit;
      }
    </style>
  </head>

  <body
    style="margin:0; padding:0;"
    bgcolor="#ffffff"
    leftmargin="0"
    topmargin="0"
    marginwidth="0"
    marginheight="0"
  >
    <table
      border="0"
      width="100%"
      height="100%"
      cellpadding="0"
      cellspacing="0"
      bgcolor="#ffffff"
    >
      <tr>
        <td
          align="center"
          valign="top"
          bgcolor="#ffffff"
          style="background-color: #ffffff;"
        >
          <br />
          <!-- 600px container (white background) -->
          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
            style="width:600px;max-width:600px;"
          >
            <tr>
              <td
                class="container-padding header"
                align="left"
                style="padding-top:40px; padding-bottom: 0;"
              >
                <div style="width: 100%">
                  <a href="${process.env.HOST}/tracker/${emailData.activityId}?track=vittleLogoClick&redirect=https://www.vittle.ca">
                    <img
                      class="logo"
                      style="display: block; margin-bottom: 56px"
                      width="100"
                      src="http://jeremybellefeuille.com/images/vittle-logo.png"
                      alt="Vittle"
                    />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td
                class="container-padding content"
                align="left"
                style="padding-top:0px;padding-bottom:0;background-color:#ffffff"
              >
                <div
                  mc:edit="body"
                  class="body-text"
                  style="font-family:Helvetica, Arial, sans-serif;font-size:18px;line-height:26px;text-align:left;color:#333333;"
                >
                  <p style="margin-bottom: 32px;">
                    ${emailData.firstName}, verify your account 
                  </p>
                  <!-- 
                  <p style="margin-bottom: 32px;">    
Create a password to begin using your Vittle account and to confirm you want to use EMAIL as your contact email address and username for Vittle.

                  </p> -->

                  <a
                    href="${process.env.HOST}/tracker/${emailData.activityId}?track=setPasswordButtonClick&redirect=https://www.vittle.ca"
                    style="font-size:18px;margin:0 0 32px 0;display:inline-block;padding:0.8em 1.6em;font-size: 16px;
                    background-color: #fee173;text-decoration:none; color: #333; font-weight: 600;"
                  >
                    Set your password
                  </a>
                </div>
              </td>
            </tr>
          </table>

          <!--/600px container -->
          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
          >
            <tr>
              <td
                class="container-padding footer-text"
                align="left"
                style="font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:19px;color:#aaaaaa;padding-top:20px;"
              >
                <p style="margin-bottom: 4px; margin-top: 0;">
                  Vittle, 1160 Heron Road, Ottawa, ON K1V 6B2
                </p>

                <img src="${process.env.HOST}/tracker/${emailData.activityId}?track=emailOpen" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!--/100% background wrapper-->
  </body>
</html>
`;

  return emailData.language === "EN" ? welcomeEnglish : welcomeFrench;
}
