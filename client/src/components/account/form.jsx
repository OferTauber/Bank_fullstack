import { useState } from 'react';

const Form = ({ title, color, transaction }) => {
  const [input, setInput] = useState(0);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    transaction(title, input);
  };

  return (
    <form
      className={`ui segment ${color}`}
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
          value={input}
          min="0"
          required
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <button className={`ui button ${color}`}>{title}</button>
      </div>
    </form>
  );
};

export default Form;
