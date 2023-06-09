"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Signatures", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      claimId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Claims",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      signature: {
        type: Sequelize.TEXT("long"),
      },
      isPrimary: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Signatures");
  },
};
