const handleError = (err, res) => {
  console.error(err);

  if (!err.isOperational) {
    process.exit(1);
  }

  res.status(err.statusCode).json({ error: err.message });
};

module.exports = handleError;
