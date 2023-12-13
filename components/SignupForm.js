import React, { useState } from 'react';
import DefaultButton from './DefaultButton';

const SignupForm = ({ isInModal = false, onFormSubmitted = () => {} }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }

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
    console.log('Form Submitted', formData);
    // Add data to hubspot
    const hubspotData = {
      fields: [
        {
          name: 'email',
          value: formData.email,
        },
        {
          name: 'firstname',
          value: formData.firstName,
        },
        {
          name: 'lastname',
          value: formData.lastName,
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
        setTimeout(() => {
          onFormSubmitted();
        }, 2000);
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
      <h2 className="font-bold mb-2">
        Coming soon - signup to be notified when we're live
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`p-2 border rounded-md w-full ${
                errors.firstName ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="flex-1">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
            />
            {/* Assuming last name isn't required, no error handling here */}
          </div>
        </div>
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
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <DefaultButton
          type="submit"
          className={
            isInModal
              ? 'inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium sm:text-sm'
              : ''
          }
          submittedStyle={`${
            isSubmitted ? ' !bg-white !text-black !font-bold !px-0 ' : ''
          }`}
        >
          {isSubmitted ? 'Submitted' : 'Submit'}
        </DefaultButton>
      </form>
    </div>
  );
};

export default SignupForm;
