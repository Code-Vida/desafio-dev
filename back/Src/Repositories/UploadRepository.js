import Cnab from "../Models/Cnab";
import SequelizeConnection from '../Connections/SequelizeConnection';
import Return from "../Models/Return";
import TipoTransacao from "../Models/TipoTransacao";
import { Op, Sequelize } from 'sequelize';

class UploadRepository extends SequelizeConnection {
    constructor() {
        super();
    }
    async upload(obj) {
        let retorno = await Cnab.create({
			tipoTransacao: parseInt(obj.tipoTransacao),
			data: obj.data,
			valor: parseFloat(obj.valor),
			cpf: obj.cpf,
			cartao: obj.cartao,
			hora: obj.hora,
			donoLoja: obj.donoLoja.replace(/\s+/g,' ').trim(),
			nomeLoja: obj.nomeLoja.replace(/\s+/g,' ').trim()
		});
		if (!retorno.dataValues)
			return new Return(201, 'Falha ao inserir os dados');

		return new Return(200, 'OK', retorno.dataValues);
    }

  
	async getAll()
	{
		let results = await Cnab.findAll({
			attributes: [
				'tipoTransacao',
				'data',
				'valor',
				'cpf',
				'cartao',
				'hora',
				'donoLoja',
				'nomeLoja',
				'dataUpload',
			],
            include: [
                {
                  model: TipoTransacao,
                  required: true,
                  attributes: ['tipo', 'descricao', 'natureza', 'sinal'],
                  on: {
                    [Op.and]: [
                      {
                        tipoTransacao: Sequelize.where(Sequelize.col("TipoTransacao.tipo"), "=", Sequelize.col("Cnab.tipoTransacao"))
                      }
                    ]
                  },
                }],
                order: [['id', 'DESC']],
		});

		return new Return(200, 'OK', results);
	}

}

export default new UploadRepository()