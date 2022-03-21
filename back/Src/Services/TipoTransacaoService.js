import TipoTransacaoRepository from '../Repositories/TipoTransacaoRepository';

class TipoTransacaoService
{
	async getAll()
	{
		return await TipoTransacaoRepository.getAll();
	}

	async addNew(cnab)
	{
		return await TipoTransacaoRepository.addNew(cnab)
	}
}
export default new TipoTransacaoService();