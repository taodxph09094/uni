import httpService from '../httpServices';
import { TRANSACTION_URL } from 'constants/api';

class TransactionsService {
  getTransactionList(requestParams) {
    return httpService.get(TRANSACTION_URL.GET_LIST_TRANSACTION, { params: requestParams });
  }
}

export default new TransactionsService();
