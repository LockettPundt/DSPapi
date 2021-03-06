/* eslint-disable no-unused-vars */
import moment from 'moment'
import { Order } from '../schema/Order-type'

export default function emailGenerator(order: Order) {
  const formattedDate = `${moment(order.jobDate).format('LL')} at ${order.time}`;
  const template = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="https://www.w3.org/1999/xhtml">
    <head>
      <!-- The character set should be utf-8 -->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width"/>
      <!-- Link to the email's CSS, which will be inlined into the email -->
      <link rel="stylesheet" href="assets/css/foundation-emails.css">
      <style>
        <!-- Your CSS to inline should be added here -->
      </style>
    </head>
    
    <body>
      <!-- Wrapper for the body of the email -->
      <table class="body" data-made-with-foundation>
        <tr>
          <!-- The class, align, and <center> tag center the container -->
          <td class="float-center" align="center" valign="top">
            <center>
              <table class="container">
                <tr>
                  <td>
                    <table class="row">
                      <tr>
                        <th class="small-12 large-6 first columns">
                          Conformation Number: ${order.id}
                        </th>
                        <th class="small-12 large-6 last columns">
                          When: ${formattedDate}
                        </th>
                        <th class="expander"></th>      
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </center>
          </td>
        </tr>
      </table>
    </body>
    </html>

  `;
  return template;
}
