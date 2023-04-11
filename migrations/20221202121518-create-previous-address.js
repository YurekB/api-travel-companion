"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PreviousAddresses", {
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
      startDate: {
        type: Sequelize.STRING,
      },
      endDate: {
        type: Sequelize.STRING,
      },
      addressLineOne: {
        type: Sequelize.STRING,
      },
      addressLineTwo: {
        type: Sequelize.STRING,
      },
      addressLineThree: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      postcode: {
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
    await queryInterface.dropTable("PreviousAddresses");
  },
};
