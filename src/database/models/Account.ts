import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from ".";

class Account extends Model<InferAttributes<Account>,
InferCreationAttributes<Account>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare status: boolean;
  declare CPF?: string;
  declare CNPJ?: string;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CPF: {
    type: DataTypes.STRING(11),
    allowNull: true,
  },
  CNPJ: {
    type: DataTypes.STRING(14),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  sequelize,
  tableName: "Accounts",
  timestamps: false,
})

export default Account;