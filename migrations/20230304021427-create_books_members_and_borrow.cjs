'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('Books', {
      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

    await queryInterface.createTable('Members', {
      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      borrowedBooks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      penaltyExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
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

    await queryInterface.createTable('Borrow', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      memberCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        references: {
          model: 'Members',
          key: 'code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      bookCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        references: {
          model: 'Books',
          key: 'code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      borrowedDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      returnedDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('Borrow');
    await queryInterface.dropTable('Members');
    await queryInterface.dropTable('Books');
  }
};
