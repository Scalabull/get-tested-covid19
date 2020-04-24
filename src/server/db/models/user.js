'use strict'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      disabled: DataTypes.BOOLEAN,
      token: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user) => {
          return encryptPassword(user)
        },
        beforeUpdate: (user) => {
          return encryptPassword(user)
        },
      },
    }
  )
  User.associate = function (models) {
    // associations can be defined here
  }

  User.prototype.generateToken = function () {
    const user = this
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET)
    user.token = token
    user.save()
    return token
  }

  User.prototype.correctPassword = function (candidatePwd) {
    const user = this
    return bcrypt.compareSync(candidatePwd, user.password)
  }

  const encryptPassword = async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hashSync(user.password, 8)
    }
  }

  return User
}
