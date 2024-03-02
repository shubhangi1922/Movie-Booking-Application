const uuid = require('uuidv4');
const tokenGenerator = require('uuid-token-generator');
const b2a = require('b2a');

exports.signUp = (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: b2a.encode(req.body.first_name + req.body.last_name),
    uuid: uuid.v4(),
    access_token: tokenGenerator.generate(),
    isLoggedIn: true,
  });

  user.save((err) => {
    if (err) return res.status(500).json({ message: err.message || 'Some error occurred while creating user.' });
    res.json({ message: 'User created successfully.' });
  });
};

exports.login = (req, res) => {
  User.findOne({ username: b2a.encode(req.body.username) }, (err, user) => {
    if (err) return res.status(500).json({ message: err.message || 'Some error occurred while retrieving user.' });
    if (!user) return res.status(404).json({ message: 'User not found with username ' + req.body.username });

    if (b2a.decode(user.username) === req.body.username && user.password === req.body.password) {
      res.json({
        message: 'User logged in successfully.',
        uuid: user.uuid,
        access_token: user.access_token,
        isLoggedIn: user.isLoggedIn,
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  });
};

exports.logout = (req, res) => {
  User.findOneAndUpdate(
    { uuid: req.body.uuid },
    { isLoggedIn: false },
    { new: true },
    (err, user) => {
      if (err) return res.status(500).json({ message: err.message || 'Some error occurred while updating user.' });
      if (!user) return res.status(404).json({ message: 'User not found with uuid ' + req.body.uuid });
      res.json({ message: 'User logged out successfully.' });
    }
  );
};

exports.getCouponCode = (req, res) => {
  Coupon.findOne({ uuid: req.body.uuid }, (err, coupon) => {
    if (err) return res.status(500).json({ message: err.message || 'Some error occurred while retrieving coupon.' });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found with uuid ' + req.body.uuid });
    res.json(coupon);
  });
};

exports.bookShow = (req, res) => {
  Show.findOneAndUpdate(
    { uuid: req.body.showUuid },
    { $push: { bookings: req.body.booking } },
    { new: true },
    (err, show) => {
      if (err) return res.status(500).json({ message: err.message || 'Some error occurred while booking show.' });
      if (!show) return res.status(404).json({ message: 'Show not found with uuid ' + req.body.showUuid });
      res.json({ message: 'Show booked successfully.' });
    }
  );
};