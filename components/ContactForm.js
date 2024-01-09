import React, { useState } from 'react';
import DefaultButton from './DefaultButton';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSubmitted(false);
    setLoading(false);
    if (errors[e.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: null,
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      console.log('Validation Failed', errors);
      setLoading(false);
      return;
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/send-contact-form-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.text())
      .then((data) => {
        console.log('Success:', data);
        setLoading(false);

        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
        setIsSubmitted(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 text-main">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className={`p-2 border border-gray-300 rounded-md w-full ${
            errors.firstName ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className={`p-2 border border-gray-300 rounded-md w-full ${
            errors.email ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
      </div>
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className={`p-2 border border-gray-300 rounded-md w-full ${
            errors.message ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.message && <p className="text-red-500 ">{errors.message}</p>}
      </div>

      <DefaultButton
        className="-mb-2 w-full sm:w-40"
        type="submit"
        submittedStyle={`${
          isSubmitted ? ' !bg-accentSecondary !text-black !font-bold ' : ''
        }`}
      >
        {isLoading ? 'Sending...' : isSubmitted ? 'Sent' : 'Send Message'}
      </DefaultButton>
    </form>
  );
};

export default ContactForm;
