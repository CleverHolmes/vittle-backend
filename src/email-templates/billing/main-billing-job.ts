interface MainBillingJobProps {
  weekOf: string;
  usersWithAmount: Array<any>;
}

export default function billingTemplate(emailData: MainBillingJobProps) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <!-- <title>{{title}} | {{productName}} -->

    <style type="text/css">
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
      @media screen and (max-width: 450px) {
        .logo {
          width: 100px;
          height: auto;
          margin-right: 0px !important;
          margin-left: 0px !important;
        }
      }
    </style>
  </head>

  <body
    style="
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
    "
    bgcolor="#ffffff"
    leftmargin="0"
    topmargin="0"
    marginwidth="0"
    marginheight="0"
  >
    <div style="background: #eeeeee">
      <p
        style="
          display: none !important;
          visibility: hidden;
          mso-hide: all;
          font-size: 1px;
          color: #ffffff;
          line-height: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
        "
      >
       Billing summary for the week of ${emailData.weekOf}
      </p>
    </div>
    <meta itemprop="name" content="Billing summary for the week of ${emailData.weekOf}" />
    <table
      border="0"
      width="100%"
      height="100%"
      cellpadding="0"
      cellspacing="0"
      bgcolor="#ffffff"
      style="border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt"
    >
      <tr>
        <td
          align="center"
          valign="top"
          bgcolor="#ffffff"
          style="border-collapse: collapse; background-color: #ffffff"
        >
          <!-- 600px container (white background) -->
          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
            style="
              border-spacing: 0;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 600px;
              max-width: 600px;
              font-family: Helvetica, Arial, sans-serif;
            "
          >
            <tr>
              <td
                class="header"
                align="left"
                style="
                  border-collapse: collapse;
                  padding-top: 40px;
                  padding-bottom: 0;
                "
              >
                <div style="width: 100%">
                  <img
                    class="logo"
                    style="
                      -ms-interpolation-mode: bicubic;
                      display: block;
                      margin-bottom: 40px;
                    "
                    width="120"
                    src="https://www.vittle.ca/Vittle-Email-Logo.png"
                    alt="Vittle"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="border-collapse: collapse">
                <p
                  mc:edit="subject"
                  style="
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 28px;
                    line-height: 36px;
                    font-weight: bold;
                    margin-top: 0px;
                    margin-bottom: 0;
                  "
                >
                  Omar, here's the billing summary for the week of ${emailData.weekOf}
                </p>

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
                    margin-top: 1.25em;
                  "
                >
         
                  <tr style="">
                    <td class="delivery-half">
                      <p
                        style="
                          line-height: 26px;
                          font-size: 20px;
                          margin-top: 30px;
                          font-weight: bold;
                        "
                      >
                        Amount due
                      </p>
                      <p
                        style="
                          line-height: 26px;
                          font-size: 28px;
                          margin-bottom: 1.25em;
                          margin-top: 0;
                        "
                      >
                        $45.20
                      </p>
                    </td>

                    <td class="delivery-half">
                      <p
                        style="
                          line-height: 26px;
                          font-size: 20px;
                          margin-top: 30px;
                          font-weight: bold;
                        "
                      >
                        New sign-ups
                      </p>
                      <p
                        style="
                          line-height: 26px;
                          font-size: 28px;
                          margin-bottom: 1.25em;
                          margin-top: 0;
                        "
                      >
                        1
                      </p>
                    </td>
                  </tr>

                  <tr valign="top">
                    <td class="delivery-half">
                      <p
                        style="
                          line-height: 26px;
                          font-size: 20px;
                          margin-top: 0;
                          font-weight: bold;
                        "
                      >
                        Active users
                      </p>
                      <p
                        style="
                          line-height: 26px;
                          font-size: 28px;
                          margin-bottom: 1.25em;
                          margin-top: 0;
                        "
                      >
                        2
                      </p>
                    </td>

                    <td class="delivery-half">
                      <p
                        style="
                          line-height: 26px;
                          font-size: 20px;
                          margin-top: 0;
                          font-weight: bold;
                        "
                      >
                        Paused users
                      </p>
                      <p
                        style="
                          line-height: 26px;
                          font-size: 28px;
                          margin-bottom: 1.25em;
                          margin-top: 0;
                        "
                      >
                        1
                      </p>
                    </td>
                  </tr>

                  <tr valign="top">
                    <td class="delivery-half">
                      <p
                        style="
                          line-height: 26px;
                          font-size: 20px;
                          margin-top: 0;
                          font-weight: bold;
                        "
                      >
                        Cancelled users
                      </p>
                      <p
                        style="
                          line-height: 26px;
                          font-size: 28px;
                          margin-bottom: 1.25em;
                          margin-top: 0;
                        "
                      >
                        0
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p></p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p style="padding-bottom: 00px"></p>
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 20px;
                    margin-top: 28px;
                    margin-bottom: 1em;
                  "
                ></p>
              </td>
            </tr>
            <tr>
              <td style="border-collapse: collapse">
                <p></p>
              </td>
            </tr>
          </table>

          <table
            border="0"
            width="600"
            cellpadding="0"
            cellspacing="0"
            class="container"
            style="
              border-spacing: 0;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            "
          >
            <tr>
              <td colspan="2" style="border-collapse: collapse">
                <p
                  style="
                    margin-top: 50px;
                    margin-bottom: 32px;
                    text-align: center;
                  "
                >
                  <a
                    href="https://toolbox.vittle.ca/billing"
                    style="
                      font-family: Arial, Helvetica, sans-serif;
                      font-size: 18px;
                      margin: 0 0 0 0;
                      display: inline-block;
                      padding: 1.2em 2.5em;
                      font-size: 16px;
                      background-color: #fee173;
                      text-decoration: none;
                      color: #333;
                      font-weight: 600;
                    "
                    class="btn-link"
                  >
                    View billing dashboard
                  </a>
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
}
