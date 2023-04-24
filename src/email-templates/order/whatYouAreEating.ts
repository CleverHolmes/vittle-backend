interface OrderEmailProps {
  firstName: string;
  language?: string;
  orderId?: string;
  orderDate?: string;
  lineItems: Array<object>;
  headingPart: string;
  subheading?: string;

  customerLanguage?: string;
  deliveryDate?: any;
  deliveryType?: string;
  deliveryTime?: string;
  selectedWeek?: number;
}

export default function whatYouAreEatingEmail(emailData: OrderEmailProps) {
  let dishes = ``;
  let isEven = false;

  emailData.lineItems.forEach((e: any, i: number) => {
    const isLastItem = emailData.lineItems.length === i + 1;

    if (i % 2 !== 0 || i === 0) {
      dishes += `<tr valign="top">`;
    }

    dishes += `
        <td class="delivery-half" style="padding-right: 2%">
            <img
                src="https://via.placeholder.com/720x720/ccc"
                style="max-width: 100%"
            />
            <p
                style="line-height: 26px; margin-bottom: 0; font-weight: bold"
            >
                ${e.title}
            </p>
            ${
              e.description !== ""
                ? `
                <p style="line-height: 26px; margin-top: 0; margin-bottom: 32px">
                    ${e.description}
                </p>`
                : ""
            }
        </td>
    `;

    if (i % 2 == 0 || isLastItem) {
      dishes += `</tr>`;
    }
  });

  const eatingEnglish = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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

      .delivery-half:last-child {
        padding-left: 2%;
      }

      @media screen and (max-width: 450px) {
        .logo {
          width: 100px;
          height: auto;
          margin-right: 0px !important;
          margin-left: 0px !important;
        }

        /* .delivery-half {
          width: 100%;
          float: left;
          column-span: 3;
        } */
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
    <div style="background: #eeeeee">
     
    </div>
    <meta itemprop="name" content="{{title}}" />
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
                class="header"
                align="left"
                style="padding-top: 40px; padding-bottom: 0"
              >
                <div style="width: 100%">
                  <img
                    class="logo"
                    style="display: block; margin-bottom: 40px"
                    width="120"
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
                    margin-bottom: 30px;
                  "
                >
                  ${emailData.firstName}, ${emailData.headingPart}
                </p>


                ${
                  emailData.hasOwnProperty("subheading")
                    ? `  <p
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 20px;
                    margin-top: 28px;
                    margin-bottom: 1em;
                  "
                >
                  ${emailData.subheading}
                </p> `
                    : ""
                }
              
              </td>
            </tr>
            <tr>
              <td>
                <p></p>
              </td>
            </tr>

        
            ${dishes}
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
</html>`;

  return eatingEnglish;
}
