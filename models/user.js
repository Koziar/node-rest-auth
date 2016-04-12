var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

// set up a mongoose model
var UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: []
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) return cb(err);

        cb(null, isMatch);
    });
};
//
//UserSchema.methods.findOne = function (err, user) {
//    if (err) {
//        return done(err, false);
//    }
//    if (user) {
//        done(null, user); // You could choose to return the payLoad instead
//    }
//    else {
//        done(null, false, "User found in token no found");
//    }
//};


module.expors = mongoose.model('User', UserSchema);
