const fetch = require("node-fetch");

class Merchant {
  static async checkInfoAccount(req, res) {
    try {
      const account = await fetch(
        `${process.env.APIGAME}/merchant/${process.env.MERCHANTID_APIGAME}?signature=${process.env.SIGNATURE_APIGAME}`
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          throw new Error(err);
        });

      return res.json(account);
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = Merchant;
