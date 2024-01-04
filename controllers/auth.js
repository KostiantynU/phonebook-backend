const registration = async (req, res, next) => {
  console.log(req.body);

  res.json({ ok: true });
};

module.exports = { authController: { registration } };
