"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Lead, Signature }) {
      // define association here
      this.belongsTo(Lead, { foreignKey: "leadId", as: "Lead" });
      this.hasMany(Signature, { foreignKey: "claimId", as: "Signatures" });
    }
  }
  Claim.init(
    {
      leadId: DataTypes.INTEGER,
      clientApiResponse: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Claim",
    }
  );
  return Claim;
};
