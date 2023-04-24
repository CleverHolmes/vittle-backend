import moment from "moment";

interface OrderEmailProps {
  firstName: string;
  language: string;
  orderId: string;
  orderDate: string;
  orderItemsTotal: number;

  customer: any;
  customerLanguage?: string;
  address?: any;
  deliveryDate: any;
  delivery: any;

  lineItems: any;
  total: any;
  orderLineItems: object;

  heading: string;
  paragraph: string;

  button?: boolean;
  buttonText?: string;
  buttonLink?: string;

  message: string | null;
  image?: string | null;
}

export default function deliveryInTransitEmail(emailData: OrderEmailProps) {
  const isPickup = emailData.delivery.type === "pickup";

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
    return `<tr align>
          <td> 
            <p style="margin-bottom: 0; margin-top: 0px; font-size: 16px;">${
              e.title
            }</p>
            <p
              style="
                color: rgb(185, 178, 182);
                margin-top: 4px;
                font-size: 14px;
              ">
              ${
                e.selectedVariant.name === "-"
                  ? "Standard"
                  : e.selectedVariant.name
              }
            </p>
          </td>
          <td align="right" style="vertical-align:top">
            <p style="margin-bottom: 0; margin-top: 0px; font-size: 16px;">Qty: ${
              e.quantity
            }</p>
          </td>
        </tr>`;
  });

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
                    text-align: left;
                  "
                >
                  ${emailData.heading}
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
                ${emailData.paragraph} 
                </p>
                
               ${
                 emailData.message !== undefined
                   ? `   
                 <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                  Message
                </p>

                <p style="font-size: 16px; margin-top: 0; font-family: Arial, Helvetica, sans-serif; font-style: italic;">
                  “${emailData.message}”
                </p>`
                   : ""
               }

              ${
                emailData.image !== undefined
                  ? `   
                 <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                  Image
                </p>`
                  : `       <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                  Image
                </p>`
              }

               
             
              </td>
            </tr>
            
            ${
              emailData.button
                ? `<tr>
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
                        href="${emailData.buttonLink}"
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
                        ${emailData.buttonText}
                      </a>
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
                    emailData.delivery.type === "pickup" ? "Pickup" : "Delivery"
                  }
                </p>
              </td>
            </tr>

            <tr valign="top">
              <td class="delivery-half">
                <p style="line-height: 26px; margin-top: 0; font-weight: bold;font-size: 16px;">
                  ${
                    emailData.delivery.type === "pickup"
                      ? "Pickup location"
                      : "Delivered to"
                  }
                </p>
                    ${
                      emailData.delivery.type === "pickup"
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
                  emailData.delivery.type === "pickup" ? "Pickup" : "Delivery"
                } date
                </p>
                <p style="margin-top: 0; line-height: 26px;font-size: 16px;">
                ${
                  emailData.delivery.type === "pickup"
                    ? "Between 2:30 p.m. to 4:00 p.m."
                    : "Between 2:30 p.m. to 6:30 p.m."
                }
                </p>
              </td>
            </tr>

            ${
              emailData.delivery.type !== "pickup"
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
        emailData.delivery.type === "pickup"
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

  //   return emailData.language === "EN" ? orderEnglish : orderFrench;

  return orderEnglish;
}
