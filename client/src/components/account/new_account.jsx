import { useState } from 'react';
import { newAccaount } from '../../axios';

const NewAccount = ({ userId, reload }) => {
  const [inputCash, setInputCash] = useState(0);
  const [inputCredit, setInputCredit] = useState(0);

  const onInputCashChange = (e) => {
    setInputCash(e.target.value);
  };
  const onInputCreditChange = (e) => {
    setInputCredit(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await newAccaount(userId, inputCash, inputCredit);
    reload();
    setInputCash(0);
    setInputCredit(0);
  };

  return (
    <div className="ui raised segments">
      <div className="ui segment pink">
        <h4>New Account</h4>
      </div>
      <div className="ui segment ">
        <form
          className="ui form"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <div className="fields">
            <div className="field">
              <label>Cash</label>
              <input
                type="number"
                value={inputCash}
                min="0"
                required
                onChange={(e) => {
                  onInputCashChange(e);
                }}
              />
            </div>
            <div className="field">
              <label>Credit</label>
              <input
                type="number"
                value={inputCredit}
                min="0"
                required
                onChange={(e) => {
                  onInputCreditChange(e);
                }}
              />
            </div>
            <div className="field">
              <label> </label>
              <br />
              <button className="ui button " placeholder="Middle Name">
                New Account
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* <form className="ui segment" onSubmit={(e) => onSubmit(e)}>
        <div className="ui right labeled input">
          <label htmlFor="amount" className="ui label">
            $
          </label>
          <input
            type="number"
            placeholder="Amount"
            id="amount"
            value={inputCash}
            min="0"
            required
            onChange={(e) => {
              onInputCashChange(e);
            }}
          />
          <button className={`ui button`}>Cash</button>
        </div>
      </form> */}
    </div>
  );
};

export default NewAccount;
