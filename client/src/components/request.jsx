import { useState } from 'react';
import sendReqwest from '../axios';

const Request = ({ config, passDataToParent }) => {
  const { name, type, params, route } = config;

  const [json, setJson] = useState(resetValues(params.json));
  const [query, setQuery] = useState(resetValues(params.query));
  const [spinner, setSpinner] = useState('');

  const mapParams = (params) => {
    const jsx = [];

    for (const key in params.json) {
      jsx.push(
        <div className="field" key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type={typeof params.json[key] === 'number' ? 'number' : 'text'}
            value={json[key]}
            onChange={(e) => {
              onInputChange(e, key, json, setJson);
            }}
            id={key}
          />
        </div>
      );
    }

    for (const key in params.query) {
      jsx.push(
        <div className="field" key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type={typeof params.json[key] === 'number' ? 'number' : 'text'}
            value={json[key]}
            onChange={(e) => {
              onInputChange(e, key, query, setQuery);
            }}
            id={key}
          />
        </div>
      );
    }

    return jsx;
  };

  const onInputChange = (event, key, state, stateSetter) => {
    const prev = { ...state };
    prev[key] = event.target.value;
    stateSetter(prev);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setSpinner('loading');
    try {
      console.log(json, query);
      const res = await sendReqwest(type, route, { json, query });
      passDataToParent(res);
    } catch (err) {
      console.warn(err);
      passDataToParent(err);
    }
    setSpinner('');
  };

  return (
    <div className="ui vertical segment">
      <br />
      <br />
      <form
        className={`ui ${spinner} form`}
        onSubmit={(e) => {
          onFormSubmit(e);
        }}
      >
        <h3>{name}</h3>
        <div className="fields">
          {mapParams(params)}
          <div className="field">
            <button className="ui button" type="submit">
              Send API Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Request;

const resetValues = (paramsObj) => {
  const toReturn = { ...paramsObj };
  for (const key in toReturn) {
    toReturn[key] = typeof toReturn[key] === 'number' ? 0 : '';
  }

  return toReturn;
};
