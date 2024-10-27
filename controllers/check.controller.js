// packages
const { validate } = require("deep-email-validator");

// check
async function check(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        ok: false,
        message: "Missing email",
      });
    }

    if (!isNaN(email)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid email format",
      });
    }

    const response = await validate(email);

    if (response.valid) {
      return res.status(200).json({
        ok: true,
        message: "Email is valid",
        data: response,
      });
    } else {
      return res.status(400).json({
        ok: false,
        message: "Invalid email",
        data: response,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
      error: err,
    });
  }
}

module.exports = { check };
