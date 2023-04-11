"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Lead }) {
      this.belongsTo(Lead, { foreignKey: "leadId", as: "Leads" });
    }
  }
  Address.init(
    {
      leadId: DataTypes.INTEGER,
      partialId: DataTypes.STRING,
      addressLineOne: DataTypes.STRING,
      addressLineTwo: DataTypes.STRING,
      addressLineThree: DataTypes.STRING,
      city: DataTypes.STRING,
      postcode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
