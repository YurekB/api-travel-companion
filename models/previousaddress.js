"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PreviousAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Lead }) {
      this.belongsTo(Lead, { foreignKey: "leadId", as: "Lead" });
    }
  }
  PreviousAddress.init(
    {
      leadId: DataTypes.INTEGER,
      partialId: DataTypes.INTEGER,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
      addressLineOne: DataTypes.STRING,
      addressLineTwo: DataTypes.STRING,
      addressLineThree: DataTypes.STRING,
      city: DataTypes.STRING,
      postcode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PreviousAddress",
    }
  );
  return PreviousAddress;
};
