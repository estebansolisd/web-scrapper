'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WebsiteLink extends Model {
    static associate(models) {
      WebsiteLink.belongsTo(models.UserWebsite, { foreignKey: 'UserWebsiteId' }); // Added association
    }
  }
  WebsiteLink.init({
    url: DataTypes.STRING,
    UserWebsiteId: DataTypes.INTEGER // Added UserWebsiteId attribute
  }, {
    sequelize,
    modelName: 'WebsiteLink',
  });
  return WebsiteLink;
};



