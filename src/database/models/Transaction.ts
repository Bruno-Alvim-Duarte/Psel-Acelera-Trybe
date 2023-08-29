import { CreationOptional, DataTypes,
  InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '.';
import Account from './Account';

class Transaction extends Model<InferAttributes<Transaction>,
InferCreationAttributes<Transaction>> {
  declare id: CreationOptional<number>;
  declare accountId: number;
  declare date: string;
  declare value: number;
  declare cashback: number;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  cashback: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Transactions',
  timestamps: false,
  underscored: true,
});

Account.hasMany(Transaction, { foreignKey: 'accountId', as: 'transactions' });

Transaction.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });

export default Transaction;
