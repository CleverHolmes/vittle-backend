import moment from "moment";
import currency from "currency.js";

interface OrderEmailProps {
  orderId: string;

  firstName: string;
  language: string;
  reportedAt: string;
  reportedAtMessage: string;
  orderDate: string;

  customerLanguage?: string;
  deliveryDate: any;
  deliveryType: string;
}

export default function orderReceiptEmail(emailData: OrderEmailProps) {
  const orderFrench = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
        }
      }
      @media screen and (max-width: 680px) {
        .header-text {
          float: left !important;
          width: calc(100% - 70px) !important;
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

      .delivery-half {
        width: 50%;
      }

      .delivery-half:first-child {
        padding-right: 2%;
      }

      @media screen and (max-width: 450px) {
        .logo {
          width: 100px;
          height: auto;
          margin-right: 0px !important;
          margin-left: 0px !important;
        }

        .delivery-half {
          width: 100%;
          float: left;
          column-span: 3;
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
    style="margin: 0; padding: 0"
    bgcolor="#ffffff"
    leftmargin="0"
    topmargin="0"
    marginwidth="0"
    marginheight="0"
  >

    <div itemscope itemtype="http://schema.org/EmailMessage">
      <div itemprop="potentialAction" itemscope itemtype="http://schema.org/ConfirmAction">
        <meta itemprop="name" content="View receipt"/>
        <div itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
          <link itemprop="url" href="https://beta.vittle.ca"/>
        </div>
      </div>
      <meta itemprop="description" content="View receipt for your recent Vittle order"/>
    </div>

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
          <!-- 600px container (white background) -->
          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
            style="
              width: 600px;
              max-width: 600px;
              font-family: Helvetica, Arial, sans-serif;
            "
          >
            <tr>
              <td
                class=""
                align="left"
                style="padding-top: 40px; padding-bottom: 0; margin-left: 0"
              >
                <div style="width: 100%">
                  <img
                    class="logo"
                    style="display: block; margin-bottom: 56px; margin-left: 0;"
                    width="90"
                    src="https://www.vittle.ca/Vittle-Email-Logo.png"
                    alt="Vittle"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p
                  mc:edit="subject"
                  style="
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 28px;
                    line-height: 36px;
                    font-weight: bold;
                    margin-top: 0px;
                    margin-bottom: 16px;
                  "
                >
                  Votre commande a été reçue.
                </p>
                <p
                  style="
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    line-height: 24px;
                    margin-top: 0px;
                    margin-bottom: 16px;
                  "
                >
                    Merci pour votre commande. Nous avons reçu votre commande et sommes actuellement en train de la réviser.
                    Vous serez contacté par e-mail dès que votre commande sera prête.
                </p>
                <p style="margin-top: 24px; margin-bottom: 6px; font-size: 16px">
                  <span style="font-weight: bold">Date de commande</span> : ${
                    emailData.orderDate
                  }
                </p>

                <p style="margin-top: 0;font-size: 16px">
                  <span style="font-weight: bold">Numéro de commande :</span>
                  ${emailData.orderId}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p></p>
              </td>
            </tr>

            <tr>
              <td colspan="2" style="border-top: 1px solid #eee">
                <p
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 1.5em;
                    font-weight: 600;
                    margin-top: 1.25em;
                    margin-bottom: 32px;
                  "
                >
                  ${
                    emailData.deliveryType === "pickup"
                      ? "Pick up"
                      : "Livraison"
                  }

                </p>
              </td>
            </tr>

            <tr valign="top">
              <td class="delivery-half">
                <p style="line-height: 26px; margin-top: 0; font-weight: bold; font-size: 16px">
                  
                   ${
                     emailData.deliveryType === "delivery"
                       ? "Livré à :"
                       : "Adresse de ramassage :"
                   }
                </p>

              </td>

              <td class="delivery-half">
                <p style="line-height: 26px; margin-top: 0; font-weight: bold; font-size: 16px">
                  ${
                    emailData.deliveryType === "delivery"
                      ? "Date de livraison :"
                      : "Date de pickup :"
                  }
                </p>
                <p style="line-height: 26px; margin-top: 0; margin-bottom: 0; font-size: 16px">
                  ${moment(emailData.deliveryDate)
                    .locale("fr")
                    .format("dddd[,] MMMM D[,] YYYY")}
                </p>

                <p style="margin-top: 0; line-height: 26px;font-size: 16px;">
                ${
                  emailData.deliveryType === "pickup"
                    ? "Entre 14 h 30 à 16 h 00"
                    : "Entre 14 h 30 à 18 h 30"
                }
                </p>
              </td>
            </tr>

        
            <tr valign="top">
              <td>
                <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                  Option de livraison
                </p>

                  <p style="line-height: 26px; margin-top: 0; margin-bottom: 0;font-size: 16px;">
                  
                </p>
              </td>
            </tr>
    
        
          </table>

          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
          >
            <tr>
      

              <td
                colspan="2"
                style="
                  font-size: 13px;
                  line-height: 19px;
                  font-family: Arial, Helvetica, sans-serif;
                "
              >
            

                <p style="margin-bottom: 32px; text-align: center">
                  <a
                    href="#"
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
                    Voir le reçu
                  </a>
                </p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
</html>`;

  const orderEnglish = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
      <!-- @media screen and (max-width: 680px) {
        .logo {
          float: left;
          display: inline-block;
          margin-left: 0px !important;
        }
      } -->
      @media screen and (max-width: 680px) {
        .header-text {
          float: left !important;
          width: calc(100% - 70px) !important;
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

      .delivery-half {
        width: 50%;
      }

      .delivery-half:first-child {
        padding-right: 2%;
      }

      @media screen and (max-width: 450px) {
        .logo {
          width: 100px;
          height: auto;
          margin-right: 0px !important;
          margin-left: 0px !important;
        }

        .delivery-half {
          width: 100%;
          float: left;
          column-span: 3;
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
          <!-- 600px container (white background) -->
          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
            style="
              width: 600px;
              max-width: 600px;
              font-family: Helvetica, Arial, sans-serif;
            "
          >
            <tr>
              <td
                class=""
                align="left"
                style="padding-top: 40px; padding-bottom: 0"
              >
                <div style="width: 100%">
                  <img
                    class="logo"
                    style="display: block; margin-bottom: 56px"
                    width="90"
                    src="https://www.vittle.ca/Vittle-Email-Logo.png"
                    alt="Vittle"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p
                  mc:edit="subject"
                  style="
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 28px;
                    line-height: 36px;
                    font-weight: bold;
                    margin-top: 0px;
                    margin-bottom: 16px;
                  "
                >
                  ${emailData.firstName} reported a problem with their order
                </p>

                <p style="margin-top: 24px; margin-bottom: 6px;font-size: 16px;">
                  <span style="font-weight: bold">Report date:</span> ${
                    emailData.reportedAt
                  }
                </p>
        
                <p style="margin-top: 0; margin-bottom: 6px;font-size: 16px;">
                  <span style="font-weight: bold">Order date:</span> ${
                    emailData.orderDate
                  }
                </p>

                <p style="margin-top: 0;font-size: 16px;">
                  <span style="font-weight: bold;font-size: 16px;"> Order number:</span>
                  ${emailData.orderId}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p></p>
              </td>
            </tr>

            <tr>
              <td colspan="2" style="border-top: 1px solid #eee">
                <p
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 1.5em;
                    font-weight: 600;
                    margin-top: 1.25em;
                    margin-bottom: 32px;
                  "
                >
                  Report details
                </p>
              </td>
            </tr>


            <tr valign="top">
              <td>
                <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                  Comments
                </p>

                <p style="line-height: 26px; margin-top: 0; margin-bottom: 0;font-size: 16px;">
                  ${emailData.reportedAtMessage}
                </p>
              </td>
            </tr>
         
          </table>

          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
          >
            <tr>
              <td
                colspan="2"
                style="
                  font-size: 13px;
                  line-height: 19px;
                  margin-top: 5em;
                  font-family: Arial, Helvetica, sans-serif;
                  margin-bottom: 1em'
                "
              >

                <p style="margin-bottom: 32px; margin-top: 50px; text-align: center">
                  <a
                    href="${
                      process.env.NODE_ENV === "production"
                        ? "https://toolbox.vittle.ca/order/" + emailData.orderId
                        : "http://localhost:3001/order/" + emailData.orderId
                    }"
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
                    View order
                  </a>
                </p>
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
                class="footer-text"
                align="left"
                style="
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 13px;
                  line-height: 19px;
                  color: #aaaaaa;
                  padding-top: 20px;
                  padding-bottom: 50px;
                "
              >
                <p style="margin-bottom: 6px; margin-top: 0">
                  Bon appétit from Vittle
                </p>
                <p style="margin-bottom: 6px; margin-top: 0">
                  Vittle, 1160 Heron Road, Ottawa, ON K1V 6B2
                </p>
                <p style="margin-bottom: 6px; margin-top: 0">
                  <a href="#" style="color: inherit" class="link"
                    >Email preferences</a
                  >
                </p>
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

  return emailData.language === "EN" ? orderEnglish : orderFrench;
}
