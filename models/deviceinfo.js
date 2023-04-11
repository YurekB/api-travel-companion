"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeviceInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Lead }) {
      this.belongsTo(Lead, { foreignKey: "leadId", as: "Lead" });
    }
  }
  DeviceInfo.init(
    {
      leadId: DataTypes.INTEGER,
      partialId: DataTypes.INTEGER,
      os: DataTypes.JSON,
      device: DataTypes.JSON,
      client: DataTypes.JSON,
      ip: DataTypes.JSON,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DeviceInfo",
    }
  );
  return DeviceInfo;
};
