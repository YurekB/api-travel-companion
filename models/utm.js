"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UTM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Lead }) {
      this.belongsTo(Lead, { foreignKey: "leadId", as: "Leads" });
    }
  }
  UTM.init(
    {
      leadId: DataTypes.INTEGER,
      partialId: DataTypes.STRING,
      utmSource: DataTypes.STRING,
      utmMedium: DataTypes.STRING,
      utmCampaign: DataTypes.STRING,
      utmContent: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UTM",
    }
  );
  return UTM;
};
