'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UTMs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leadId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'Leads', 
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      partialId: {
        type: Sequelize.STRING
      },
      utmSource: {
        type: Sequelize.STRING
      },
      utmMedium: {
        type: Sequelize.STRING
      },
      utmCampaign: {
        type: Sequelize.STRING
      },
      utmContent: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UTMs');
  }
};