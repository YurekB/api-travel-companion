"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DeviceInfos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      leadId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Leads",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      partialId: {
        type: Sequelize.STRING,
      },
      os: {
        type: Sequelize.JSON,
      },
      device: {
        type: Sequelize.JSON,
      },
      client: {
        type: Sequelize.JSON,
      },
      ip: {
        type: Sequelize.JSON,
      },
      city: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DeviceInfos");
  },
};
