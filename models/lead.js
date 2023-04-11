"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Claim, UTM, DeviceInfo, Address, PreviousAddress }) {
      this.hasMany(Claim, { foreignKey: "leadId", as: "Claims" });
      this.hasMany(DeviceInfo, { foreignKey: "leadId", as: "Devices" });
      this.hasMany(UTM, { foreignKey: "leadId", as: "UTM" });
      this.hasMany(Address, { foreignKey: "leadId", as: "Addresses" });
      this.hasMany(PreviousAddress, {
        foreignKey: "leadId",
        as: "PreviousAddresses",
      });
    }
  }
  Lead.init(
    {
      uuid: DataTypes.UUID,
      version: DataTypes.STRING,
      stage: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      dob: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Lead",
    }
  );
  return Lead;
};
