export default function createdAccount(emailData: any) {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="format-detection" content="telephone=no" />
        
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
                  margin-top: -4px !important;
                }
              }
        
              @media screen and (max-width: 450px) {
                .header {
                  text-align: center;
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
        
              .btn-link {
                transition: all 0.3s ease;
              }
        
              .btn-link:hover {
                background-color: #fbd578 !important;
              }
            </style>
          </head>
        
          <body
            style="margin: 0; padding: 0"
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
                  style="background-color: #ffffff"
                >
                  <br />
                  <!-- 600px container (white background) -->
                  <table
                    border="0"
                    width="600"
                    cellpadding="0"
                    cellspacing="0"
                    class="container"
                    style="width: 600px; max-width: 600px"
                  >
                    <tr>
                      <td
                        class="container-padding header"
                        align="left"
                        style="padding-top: 56px; padding-bottom: "
                      >
                        <div style="width: 100%">
                          <img
                            class="logo"
                            style="display: block; margin-bottom: 56px"
                            width="90"
                            src="https://i.ibb.co/vqhkKZJ/vittle-logo-teal.png"
                            alt="Vittle"
                          />
                        </div>
        
                        <div class="header-text" style="float: left">
                          <p
                            mc:edit="subject"
                            style="
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 30px;
                              line-height: 36px;
                              font-weight: bold;
                              margin-top: 0px;
                              margin-bottom: 16px;
                            "
                          >
                            ${emailData.firstName}, ${emailData.language === "EN"
        ? "Account is Created"
        : "Le compte est créé"
      } 
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="container-padding content"
                        align="left"
                        style="padding-bottom: 56px; background-color: #ffffff"
                      >
                        <div
                          mc:edit="body"
                          class="body-text"
                          style="
                            font-family: Helvetica, Arial, sans-serif;
                            font-size: 18px;
                            line-height: 24px;
                            text-align: left;
                          "
                        >
                        <p style="margin-bottom: 32px; color: ${emailData.secondary ? "red" : "green"};">
                        ${emailData.secondary === false
                          ? emailData.language === "EN"
                            ? `Created Primary account of ${emailData.email} from Vittle.`
                            : `Créé Primaire supprimé de ${emailData.email} de Vittle.`
                          : emailData.language === "EN"
                            ? `Created account of ${emailData.email} from Vittle.`
                            : `Créé supprimé de ${emailData.email} de Vittle.`
                        }
                        </p>
                        <a
                        href="https://toolbox.vittle.ca/"
                        style="
                          font-size: 18px;
                          margin: 0 0 0 0;
                          display: inline-block;
                          padding: 0.8em 2em;
                          font-size: 16px;
                          background-color: #fee173;
                          text-decoration: none;
                          color: #333;
                          font-weight: 600;
                        "
                        class="btn-link"
                      >
                      ${
                        emailData.language === "EN"
                          ? `View More`
                          : "Voir plus"
                      }
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
                        style="
                          font-family: Helvetica, Arial, sans-serif;
                          font-size: 13px;
                          line-height: 19px;
                          color: #aaaaaa;
                          padding-top: 20px;
                        "
                      >
                        <p style="margin-bottom: 6px; margin-top: 0">
                          Bon appétit!
                        </p>
                        <p style="margin-bottom: 6px; margin-top: 0">
                          Vittle, 1160 Heron Road, Ottawa, ON K1V 6B2
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
        
            <!--/100% background wrapper-->
          </body>
        </html>`;
  }
  