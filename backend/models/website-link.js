'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WebsiteLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WebsiteLink.belongsTo(models.UserWebsite, { foreignKey: 'UserWebsiteId' }); // Added association
    }
  }
  WebsiteLink.init({
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    UserWebsiteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WebsiteLink',
  });
  return WebsiteLink;
};