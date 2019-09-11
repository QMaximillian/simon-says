import { isEmpty } from "validator";
import PropTypes from "prop-types";
import React from "react";
import styles from '../TextBox.module.css'

// A simple text input to take user input.
export default function TextBox(props){





    return (
      <div>
        <input
          className={styles.input}
          maxLength={3}
          // className={`outline-none bg-dark-200 mb-1 text-black rounded h-12 p-2 w-full placeholder border border-black border-solid`}
          placeholder={props.placeholder}
          type={props.type}
          name={props.name}
          onChange={props.onChange}
          disabled={props.disabled}
          autoComplete={props.autoComplete}
          value={props.value}
        />
      </div>
    );
  }

TextBox.defaultProps = {
  value: "",
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.oneOf(["text"]),
  value: PropTypes.string.isRequired,
};
