import React, { useState } from 'react';
import DefaultButton from './DefaultButton';

const SignupBox = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear errors for a particular field when it's modified
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      console.log('Validation Failed', errors);
      return;
    }
    // Add data to hubspot
    const hubspotData = {
      fields: [
        {
          name: 'email',
          value: formData.email,
        },
      ],
      context: {
        // "hutk": include HubSpot usertoken if necessary
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const response = await fetch(`/api/submit-to-hubspot`, {
        method: 'POST',
        body: JSON.stringify(hubspotData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonResponse = await response.json();

      if (response.ok) {
        console.log('Form submitted:', jsonResponse);
        setIsSubmitted(true);

        // Handle the response if necessary, such as showing a thank you message
        // setTimeout(() => {
        //   onFormSubmitted();
        // }, 2000);
      } else {
        console.error('Form submission error:', response);
        // Handle HTTP errors
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // Handle network errors
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="flex gap-x-2">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`p-2 border rounded-md w-full ${
              errors.email ? 'border-red-500' : ''
            }`}
            required
          />
        </div>

        <DefaultButton
          type="submit"
          className={errors.email ? '!bg-gray-100 pointer-events-none' : ''}
          // className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium sm:text-sm"
          // className={
          //   // isInModal
          //   //   ? 'inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium sm:text-sm'
          //   //   : ''
          // }
          submittedStyle={`${
            isSubmitted ? ' !bg-white !text-black !font-bold !px-4 ' : ''
          }`}
        >
          {isSubmitted ? (
            'Submitted'
          ) : errors.email ? (
            <span className="text-red-500">{errors.email}</span>
          ) : (
            'Join newsletter'
          )}
        </DefaultButton>
      </form>
    </div>
  );
};

export default SignupBox;
