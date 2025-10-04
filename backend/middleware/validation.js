const validateUser = (req, res, next) => {
  const { name, email, phone, company, address } = req.body;
  const errors = [];

  // Required field validation
  if (!name || !name.trim()) {
    errors.push('Name is required');
  }

  if (!email || !email.trim()) {
    errors.push('Email is required');
  } else {
    // Email format validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }
  }

  if (!phone || !phone.trim()) {
    errors.push('Phone is required');
  }

  if (!company || !company.trim()) {
    errors.push('Company is required');
  }

  if (!address || !address.city || !address.city.trim()) {
    errors.push('City is required');
  }

  if (!address || !address.zipcode || !address.zipcode.trim()) {
    errors.push('Zipcode is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

module.exports = { validateUser };
