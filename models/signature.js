"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Signature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Claim }) {
      this.belongsTo(Claim, { foreignKey: "claimId", as: "Claim" });
    }
  }
  Signature.init(
    {
      claimId: DataTypes.INTEGER,
      signature: DataTypes.TEXT("long"),
      isPrimary: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Signature",
    }
  );
  return Signature;
};
