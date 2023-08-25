import { Model, DataTypes } from "sequelize";
import sequelize from ".";

class Account extends Model {
  public id!: number;
  public name!: string;
  public password!: string;
  public status!: boolean;
  public CPF?: string;
  public CNPJ?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
}, {
  sequelize,
  tableName: "Accounts",
  timestamps: false,
})

export default Account;