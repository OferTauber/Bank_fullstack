import { useState } from 'react';

const Transfer = ({ color, transaction }) => {
  const [inputAmount, setInputAmount] = useState(0);
  const [inputTo, setInputTo] = useState('');

  const oninputAmountChange = (e) => {
    setInputAmount(e.target.value);
  };
  const oninputToChange = (e) => {
    setInputTo(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    transaction(inputAmount, inputTo);
  };

  return (
    <form
      className={`ui segment orange`}
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <div className="ui right labeled input">
        <label htmlFor="amount" className="ui label">
          $
        </label>
        <input
          type="number"
          placeholder="Amount"
          id="amount"
          value={inputAmount}
          min="0"
          required
          onChange={(e) => {
            oninputAmountChange(e);
          }}
        />{' '}
        <label htmlFor="inputTo" className="ui label">
          To account number:
        </label>
        <input
          type="text"
          placeholder="Amount"
          id="inputTo"
          value={inputTo}
          required
          onChange={(e) => {
            oninputToChange(e);
          }}
        />
        <button className={`ui button orange`}>Transfer</button>
      </div>
    </form>
  );
};

export default Transfer;
