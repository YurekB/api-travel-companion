'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid : { 
        allowNull: false,
        type: Sequelize.UUID,
      },        
      version: {
        allowNull: false,
        type: Sequelize.STRING
      },
      stage: { 
        allowNull: false,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,

        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,

        type: Sequelize.STRING
      },
      email: {
        allowNull: false,

        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,

        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Leads');
  }
};