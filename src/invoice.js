export default class Invoice {
  constructor(transaction) {
    this.invoiceNo = transaction.id;
    this.date = transaction.create_time;
    this.products = transaction.transactions[0].item_list.items.map((e) => {
      return {
        name: e.name,
        description: e.description,
        qandp: `${e.quantity} x $${e.price} ${e.currency}`,
      };
    });
    // console.log(transaction.transactions[0]);

    this.total = `$${transaction.transactions[0].amount.total} ${transaction.transactions[0].amount.currency}`;
    this.productsHTML = this.products
      .map((item) => {
        return `<tr>
        <td>
            <h5>${item.name.split("<br/>")[0]}</h5>
            <p class="desc">${item.description}</p>
        </td>
        <td class="qty">
            <p>${item.qandp}</p>
        </td>
    </tr>`;
      })
      .join("");
    // console.log(this.productsHTML);
  }
  html() {
    return `<!DOCTYPE html>
        <html lang=en>
        
        <head>
            <meta name="viewport" content=", width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            <meta charset="utf-8" />
            <meta name="color-scheme" content="only">
            <title>Rebecca Jane, Illustration and Design</title>
            <style>
                /* :root {
                    color-scheme: light dark;
                } */
        
                #email {
                    background: white;
                    width: calc(100% - 6em);
                    /* height: 100vh; */
                    margin: 2em 3em;
                }
        
                p {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 14px;
                    color: #6e6e6e;
                }
        
                a {
                    text-decoration-color: rgb(75, 75, 75);
        
                }
        
                .smol {
                    font-size: 10px;
                    color: rgb(75, 75, 75);
                }
        
        
                h2 {
                    padding-bottom: 10px;
                    font-family: serif;
                    font-size: 30px;
                }
        
        
        
        
                h3 {
                    font-family: serif;
                    font-size: 20px;
                    font-weight: 300;
                }
        
                h4 {
                    font-weight: 300;
                    font-family: serif;
        
                }
        
                img {
                    width: 100%;
                }
        
                h5 {
                    font-family: Arial, Helvetica, sans-serif;
                    color: #6e6e6e;
                    font-size: 18px;
                    margin: 0;
                    font-weight: 300;
        
                }
        
        
                body {
                    margin: 0;
                }
        
                .products td {
                    width: 50%;
                }
        
                .title {
                    padding-bottom: 5px;
                }
        
                .products {
                    text-align: left;
                    width: 100%;
        
                }
        
                table {
                    border-spacing: 0;
                    text-align: left;
                }
        
                .website {
                    padding: 20px 0;
                }
        
                .section {
                    border-top: 3px solid rgb(75, 75, 75);
        
                    padding: 10px 0;
                }
        
                .subsection {
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgb(75, 75, 75);
                }
        
                .logocontainer {
                    /* width: 100vw; */
                    width: 100%;
                    display: inline-block;
                    text-align: middle;
                    padding-bottom: 20px;
                }
        
        
                .logo {
                    width: 100px;
                    height: 100px;
                    margin: auto;
        
                }
        
                .signature {
                    width: 100px;
                }
        
                .signing h4 {
                    margin-top: 0;
                }
        
                .products h3 {
                    margin-bottom: 30px;
                }
        
                .products .desc {
                    margin-bottom: 30px;
                }
        
                .products .qty p {
                    margin: 0;
                }
        
                .products .qty {
                    vertical-align: top;
                }
        
                .products {
                    padding: 20px 0;
                }
        
                .socials p {
                    margin-right: 20px;
                }
            </style>
        </head>
        
        <body>
            <div id="email">
                <div class="logocontainer">
                    <div class="logo">
                        <img src="https://itsrebec.ca/reb-logo.png" />
                    </div>
                </div>
                <div class="section">
                    <h3>Your order is on its way!</h3>
                    <p>Thank you so much for your support! As an artist and designer, your support helps me create more amazing
                        creations to share. </p>
                    <div class="signing">
                        <img class="signature" src="https://itsrebec.ca/signature.png" />
                        <h4>Rebecca</h4>
                    </div>
                </div>
                <div class="section">
                    <div class="title">
                        <h2>Invoice</h2>
                    </div>
                    <div class="subsection">
                        <h3>Invoice No.</h3>
                        <p>${this.invoiceNo}</p>
                    </div>
                    <div class="subsection">
                        <h3>Total Paid</h3>
                        <p>${this.total}</p>
                    </div>
                    <div class="subsection">
                        <h3>Date</h3>
                        <p>${this.date}</p>
                    </div>
                    <table class="products">
                        <tr>
                            <th>
                                <h3>Product</h3>
                            </th>
                            <th>
                                <h3>Qty. & Price</h3>
                            </th>
                        </tr>


                       ${this.productsHTML}
                       


                    </table>
                </div>
                <div class="section">
                    <p class="smol">This email is generated automatically. You are permitted to respond to this email,
                        only in
                        specific
                        regards to this invoice. </p>
                    <a href="https://www.itsrebec.ca" target="_blank">
                        <p class="smol website">www.itsrebec.ca </p>
                    </a>
                    <table class="socials">
                        <tr>
                            <td>
                                <a href="https://www.instagram.com/the.rebj/" target="_blank">
                                    <p class="smol">Instagram </p>
                                </a>
                            </td>
                            <td>
                                <a href="https://creativemarket.com/rebeccajane" target="_blank">
                                    <p class="smol">Creative Market</p>
                                </a>
                            </td>
                            <td>
                                <a href="https://ello.co/rebecca_jane" target="_blank">
                                    <p class="smol">Ello</p>
                                </a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        
            </div>
        </body>
        
        </html>`;
  }
}
