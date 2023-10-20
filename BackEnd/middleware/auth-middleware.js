jwt.verify(
  socket.handshake.query.token,
  process.env.JWT_SECRET,
  function (err, decoded) {
    socket.user = decoded;
    next();
  }
);
