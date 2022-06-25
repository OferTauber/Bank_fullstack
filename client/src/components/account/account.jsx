import Form from './form';
import Transfer from './transfer';
import { form_transactions } from '../../axios';

const Account = ({ account, reload }) => {
  const onTransaction = async (type, amount) => {
    await form_transactions[type](account._id, amount);
    reload();
  };

  return (
    <div className="ui raised segments">
      <div className="ui horizontal segments">
        <div className="ui yellow segment ">
          <p>
            Account number: <span className="comp-font">{account._id}</span>
          </p>
        </div>
        <div className={`ui segment ${account.cash * 1 < 0 ? 'red' : 'green'}`}>
          <p>
            Cash: $<span className="comp-font">{account.cash}</span>
          </p>
        </div>
        <div
          className={`ui segment ${
            account.cash * 1 + account.credit * 1 < 50 ? 'red' : 'green'
          }`}
        >
          <p>
            Credit: $<span className="comp-font">{account.credit}</span>
          </p>
        </div>
        {/* <div className={`ui segment red`}>delete_accaount</div> */}
      </div>

      <Form color="blue" title="Deposit" transaction={onTransaction} />
      <Form color="teal" title="Withdraw" transaction={onTransaction} />
      <Transfer transaction={form_transactions.Transfer} />
    </div>
  );
};

export default Account;
