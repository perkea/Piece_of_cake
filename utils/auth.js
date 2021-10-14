module.exports = function (req, res, next) {

   if (!req.session.user) {
      console.log('is authentiating')
      return res.redirect("/login");
   }
   console.log('is authentiating next')
   next();
}