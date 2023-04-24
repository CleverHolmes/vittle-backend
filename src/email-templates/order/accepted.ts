import moment from "moment";
import currency from "currency.js";

interface OrderEmailProps {
  firstName: string;
  language: string;
  orderId: string;
  orderDate: string;

  customerLanguage?: string;
  address?: any;
  deliveryDate: any;
  deliveryType: string;

  lineItems: any;
  total: any;
  orderLineItems: object;

  cardLast4: string;
  cardBrand: string;
}

export default function orderReceiptEmail(emailData: OrderEmailProps) {
  const isPickup = emailData.deliveryType === "pickup";

  let deliveryAddress = "";

  if (isPickup) {
    deliveryAddress = "Vittle, 1160 Heron Road,<br />Ottawa, ON K1V 6B2";
  } else {
    if (emailData.address.organization !== "") {
      deliveryAddress += emailData.address.organization;
      deliveryAddress += "<br />";
    }
    deliveryAddress += `${emailData.address.Line1}, ${emailData.address.Line2}`;
    deliveryAddress += "<br />";
    deliveryAddress += `${emailData.address.City}, ${emailData.address.Province} ${emailData.address.PostalCode}`;

    if (emailData.address.buzzer !== "") {
      deliveryAddress += "<br />" + `${emailData.address.buzzer}`;
    }
  }

  const orderItems = emailData.lineItems.map((e: any) => {
    let itemTotal = "0";

    if (
      emailData.customerLanguage === "FR" ||
      emailData.customerLanguage === "fr"
    ) {
      itemTotal = currency(e.total, {
        pattern: "# !",
        separator: " ",
        decimal: ",",
      }).format();
    } else {
      itemTotal = currency(e.total).format();
    }

    return `<tr>
          <td>
            <p style="margin-bottom: 0; margin-top: 0px;font-size: 16px;">${e.title}</p>
            <p
              style="
                color: rgb(185, 178, 182);
                margin-top: 4px;
                font-size: 14px;
              ">
              ${e.selectedVariant.name}
            </p>
          </td>
          <td align="right">
            <p style="margin-bottom: 0; margin-top: 0px;font-size: 16px;">${itemTotal}</p>
            <p
              style="
                color: rgb(185, 178, 182);
                margin-top: 4px;
                font-size: 14px;
              ">
              Qty: ${e.quantity}
            </p>
          </td>
        </tr>`;
  });

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
                <p style="line-height: 26px; font-size:16px;">
                  ${deliveryAddress}
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

            ${
              emailData.deliveryType !== "pickup"
                ? `
                <tr valign="top">
                  <td>
                    <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                      Option de livraison
                    </p>

                     <p style="line-height: 26px; margin-top: 0; margin-bottom: 0;font-size: 16px;">
                      ${
                        emailData.address.deliveryOption === "leaveAtDoor"
                          ? "Laisser à la porte"
                          : emailData.address.deliveryOption === "meetAtDoor"
                          ? "Rendez-vous à la porte"
                          : "Rendez-vous à l'extérieur"
                      }
                    </p>
                  </td>
                </tr>`
                : ""
            }
            ${
              emailData.deliveryType === "pickup"
                ? emailData.address.notes !== ""
                  ? `
                <tr valign="top">
                  <td>
                    <p style="line-height: 26px; margin-top: 16px; font-weight: bold;font-size: 16px;">
                      Instructions
                    </p>

                     <p style="line-height: 26px; margin-top: 0; margin-bottom: 16px; font-size: 16px;">
                      ${emailData.address.notes}
                    </p>
                  </td>
                </tr>`
                  : ""
                : ""
            }

            ${
              emailData.deliveryType !== "pickup"
                ? `<tr>
              <td colspan="2">
                <p
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 16px;
                    padding: 1em;
                    margin-top: 1.25em;
                    margin-bottom: 16px;
                    color: rgb(102, 60, 0);
                    background-color: rgb(255, 244, 229);
                  "
                >
                  À cause de COVID-19 et par mesure de précaution pour nos livreurs nous offrons que la livraison sans contact.
                </p>
              </td>
            </tr>`
                : ""
            }
            

            <tr>
              <td>
                <p></p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="border-top: 1px solid #ddd">
                <p
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 1.5em;
                    font-weight: 600;
                    margin-top: 1.25em;
                    margin-bottom: 32px;
                  "
                >
                  Produits
                </p>
              </td>
            </tr>
            
            ${orderItems.join("")}

            <tr>
              <td>
                <p style="padding-bottom: 00px"></p>
              </td>
            </tr>

            <tr>
              <td colspan="2" style="border-top: 1px solid #ddd">
                <p
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 1.5em;
                    font-weight: 600;
                    margin-top: 1.25em;
                    margin-bottom: 32px;
                  "
                >
                  Quantité
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin-bottom: 10px; margin-top: 0px; font-size:16px;">Sous-total</p>
              </td>
              <td align="right">
                <p style="margin-bottom: 10px; margin-top: 0px; font-size: 16px;">
                ${currency(emailData.orderLineItems.subTotal, {
                  pattern: `# !`,
                  separator: " ",
                  decimal: ",",
                }).format()}</p>
              </td>
            </tr>

         ${
           emailData.orderLineItems.displayDeliveryFee &&
           `<tr>
                  <td>
                    <p style="margin-bottom: 10px; margin-top: 0px;font-size: 16px;">
                  Frais de livraison
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin-bottom: 10px; margin-top: 0px;font-size: 16px;">5,00 $</p>
                  </td>
                </tr>`
         }          
         
             
            
          ${
            emailData.orderLineItems.hasOwnProperty("discount")
              ? `<tr>
                <td>
                  <p style="margin-bottom: 10px; margin-top: 0px; font-size:16px;">
                    Rabais
                  </p>
                </td>
                <td align="right">
                  <p style="margin-bottom: 10px; margin-top: 0px; color: #00b89b">
                    -10,00 $
                  </p>
                </td>
            </tr>`
              : ""
          }

            <tr style="margin-bottom: 32px">
              <td>
                <p style="margin-bottom: 32px; margin-top: 0; margin-bottom: 0; font-size:16px;">
                  Taxes
                </p>
                <p
                  style="
                    color: rgb(185, 178, 182);
                    margin-top: 4px;
                    font-size: 14px;
                  "
                >
                  Numéro de TVH : 817582380RT0001
                </p>
              </td>
               <td align="right">
                <p style="margin-bottom: 32px; margin-top: 0;font-size: 16px;">${currency(
                  emailData.orderLineItems.tax,
                  {
                    pattern: "# !",
                    separator: " ",
                    decimal: ",",
                  }
                ).format()}</p>
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
                class="container-padding footer-text"
                align="left"
                colspan="2"
                style="color: #aaaaaa; border-top: 1px solid #ddd"
              >
                <tr>
                  <td>
                    <p
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 1.5em;
                        font-weight: 600;
                        margin-top: 1.25em;
                        margin-bottom: 0;
                      "
                    >
                      Paiement
                    </p>
                  </td>
                </tr>

                <tr>
                  <td valign="left">
                    <div
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        display: flex;
                        align-items: center;
                        padding: 32px 0;
                      "
                    >
                      <img
          src="https://beta.vittle.ca/card-icons/${emailData.cardBrand}.png"
                                 style="margin-right: 10px"
                        width="30"
                      />
                      <p
                        style="
                          display: inline-block;
                          margin-bottom: 0;
                          margin-top: 0;
                        "
                      >
                        <strong> &bull;&bull;&bull;&bull; ${
                          emailData.cardLast4
                        }</strong>
                      </p>
                    </div>
                  </td>

                  <td align="right">
                    <p
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        display: inline-block;
                        font-size: 1.5em;
                      "
                    >
                      <strong> Total ${currency(emailData.total, {
                        pattern: "# !",
                        separator: " ",
                        decimal: ",",
                      }).format()}</strong>
                    </p>
                  </td>
                </tr>
              </td>

              <td
                colspan="2"
                style="
                  font-size: 13px;
                  line-height: 19px;
                  font-family: Arial, Helvetica, sans-serif;
                "
              >
                <p style="margin-bottom: 40px; color: #aaa">
                  Une autorisation de prélèvement temporaire de ${currency(
                    emailData.total,
                    {
                      pattern: "# !",
                      separator: " ",
                      decimal: ",",
                    }
                  ).format()} a été effectuée sur votre moyen de paiement •••• ${
    emailData.cardLast4
  }. 
                  Il ne s'agit pas d'un paiement et il sera supprimé lors du traitement de votre commande.
                </p>

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
                    >Préférences de notification</a
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
                  Your order is being processed
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
        
                  ${
                    emailData.deliveryType === "pickup"
                      ? `Thank you for your order. We are processing your order and will notify you when your products are ready to be picked up`
                      : `Thank you for your order. We are processing your order and will
                  notify you when your products are out for delivery by our
                  local courier.`
                  }

                </p>
                <p style="margin-top: 24px; margin-bottom: 6px;font-size: 16px;">
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
                  ${emailData.deliveryType === "pickup" ? "Pickup" : "Delivery"}
                </p>
              </td>
            </tr>

            <tr valign="top">
              <td class="delivery-half">
                <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                  ${
                    emailData.deliveryType === "pickup"
                      ? "Pickup location"
                      : "Delivered to"
                  }
                </p>
                    ${
                      emailData.deliveryType === "pickup"
                        ? `<p style="line-height: 26px; margin-bottom: 0">
                  Vittle, 1160 Heron Road, <br />
                  Ottawa, ON K1V 6B2
                </p>
                <p style="margin-top: 10px">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Vittle/@45.3779382,-75.670616,16.5z/data=!4m5!3m4!1s0x0:0xb6b79ed02b4332c!8m2!3d45.3780708!4d-75.6704523"
                    >Directions</a
                  >
                </p>`
                        : `
                  <p style="line-height: 26px;font-size: 16px;">${deliveryAddress}</p>`
                    }
              </td>

              <td class="delivery-half">
                <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                ${
                  emailData.deliveryType === "pickup" ? "Pickup" : "Delivery"
                } date
                </p>
                <p style="line-height: 26px; margin-top: 0; margin-bottom: 0;font-size: 16px;">
                  ${moment(emailData.deliveryDate).format(
                    "dddd[,] MMMM D[,] YYYY"
                  )}
                </p>
                <p style="margin-top: 0; line-height: 26px;font-size: 16px;">
                ${
                  emailData.deliveryType === "pickup"
                    ? "Between 2:30 p.m. to 4:00 p.m."
                    : "Between 2:30 p.m. to 6:30 p.m."
                }
                </p>
              </td>
            </tr>

            ${
              emailData.deliveryType !== "pickup"
                ? `
                <tr valign="top">
                  <td>
                    <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                      Delivery option
                    </p>

                     <p style="line-height: 26px; margin-top: 0; margin-bottom: 0;font-size: 16px;">
                      ${
                        emailData.address.deliveryOption === "leaveAtDoor"
                          ? "Leave at door"
                          : emailData.address.deliveryOption === "meetAtDoor"
                          ? "Meet at door"
                          : "Meet outside"
                      }
                    </p>
                  </td>
                </tr>`
                : ""
            }

               ${
                 emailData.deliveryType === "pickup"
                   ? emailData.address.notes !== ""
                     ? `
                <tr valign="top">
                  <td>
                    <p style="line-height: 26px; margin-top: 16px; font-weight: bold;font-size: 16px;">
                      Instructions
                    </p>

                     <p style="line-height: 26px; margin-top: 0; margin-bottom: 16px; font-size: 16px;">
                      ${emailData.address.notes}
                    </p>
                  </td>
                </tr>`
                     : ""
                   : ""
               }

                    
            ${
              emailData.deliveryType === "delivery" &&
              `
                <tr>
                  <td colspan="2">
                    <p
                      style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 16px;
                    padding: 1em;
                    margin-top: 1.25em;
                    margin-bottom: 32px;
                    color: rgb(102, 60, 0);
                    background-color: rgb(255, 244, 229);
                  ">We’re only offering contactless delivery as a precautionary health measure for our local couriers.</p>
                  </td>
                </tr>
              `
            }

            <tr>
              <td>
                <p></p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="border-top: 1px solid #ddd">
                <p
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 1.5em;
                    font-weight: 600;
                    margin-top: 1.25em;
                    margin-bottom: 32px;
                  "
                >
                  Products
                </p>
              </td>
            </tr>
            
            ${orderItems.join("")}

            <tr>
              <td>
                <p style="padding-bottom: 00px"></p>
              </td>
            </tr>

            <tr>
              <td colspan="2" style="border-top: 1px solid #ddd">
                <p
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 1.5em;
                    font-weight: 600;
                    margin-top: 1.25em;
                    margin-bottom: 32px;
                  "
                >
                  Summary
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin-bottom: 10px; margin-top: 0px;font-size: 16px;">Subtotal</p>
              </td>
              <td align="right">
                <p style="margin-bottom: 10px; margin-top: 0px;font-size: 16px;">${currency(
                  emailData.orderLineItems.subTotal
                ).format()}</p>
              </td>
            </tr>

            ${
              emailData.orderLineItems.displayDeliveryFee
                ? `<tr>
                  <td>
                    <p style="margin-bottom: 10px; margin-top: 0px;font-size: 16px;">
                      Delivery fee
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin-bottom: 10px; margin-top: 0px;font-size: 16px;">$5.00</p>
                  </td>
                </tr>
              `
                : ""
            }

            ${
              emailData.orderLineItems.hasOwnProperty("discount")
                ? `<tr>
              <td>
                <p style="margin-bottom: 10px; margin-top: 0px;font-size: 16px;">Discount</p>
              </td>
              <td align="right">
                <p style="margin-bottom: 10px; margin-top: 0px; color: #00b89b;font-size: 16px;">
                  -$10.00
                </p>
              </td>
            </tr>`
                : ""
            }

           <tr style="margin-bottom: 32px">
              <td>
                <p style="margin-bottom: 32px; margin-top: 0; margin-bottom: 0;font-size: 16px;">
                  Tax
                </p>
                <p
                  style="
                    color: rgb(185, 178, 182);
                    margin-top: 4px;
                    font-size: 14px;
                  "
                >
                  HST No. 817582380RT0001
                </p>
              </td>
              <td align="right">
                <p style="margin-bottom: 32px; margin-top: 0;font-size: 16px;">${currency(
                  emailData.orderLineItems.tax
                ).format()}</p>
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
                class="container-padding footer-text"
                align="left"
                colspan="2"
                style="color: #aaaaaa; border-top: 1px solid #ddd"
              >
                <tr>
                  <td>
                    <p
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 1.5em;
                        font-weight: 600;
                        margin-top: 1.25em;
                        margin-bottom: 0;
                      "
                    >
                      Payment
                    </p>
                  </td>
                </tr>

                <tr>
                  <td valign="left">
                    <div
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 32px 0;
                      "
                    >
                      <img
                        src="https://beta.vittle.ca/card-icons/${
                          emailData.cardBrand
                        }.png"
                        style="margin-right: 10px"
                        width="30"
                        height="auto"
                      />
                      <p
                        style="
                          display: inline-block;
                          margin-bottom: 0;
                          margin-top: 0;
                        "
                      >
                        <strong> &bull;&bull;&bull;&bull; ${
                          emailData.cardLast4
                        }</strong>
                      </p>
                    </div>
                  </td>

                  <td align="right">
                    <p
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        display: inline-block;
                        font-size: 1.5em;
                      "
                    >
                      <strong> Total ${currency(
                        emailData.total
                      ).format()} </strong>
                    </p>
                  </td>
                </tr>
              </td>

              <td
                colspan="2"
                style="
                  font-size: 13px;
                  line-height: 19px;
                  font-family: Arial, Helvetica, sans-serif;
                  margin-bottom: 1em'
                "
              >
                <p style="margin-bottom: 40px; color: #aaa;">
                  A temporary hold of ${currency(
                    emailData.total
                  ).format()} was placed on your payment method
                  •••• ${
                    emailData.cardLast4
                  }. This is not a charge and will be removed once your
                  order is confirmed. It should disappear from your bank
                  statement shortly.
                </p> 

                <p style="margin-bottom: 32px; text-align: center">
                  <a
                    href="${
                      process.env.NODE_ENV === "production"
                        ? "https://beta.vittle.ca?order=" + emailData.orderId
                        : "http://localhost:3000?order=" + emailData.orderId
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
                    View receipt
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
