import React, { useState } from 'react';
import Button from './Button'; // Adjust the import path as needed

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Submitted', formData);
        // Additional form submission logic here
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="firstName" className="block">
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder = "First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block"></label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder = "Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="p-2 border rounded-md"
                            
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block"></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 border rounded-md"
                        placeholder='Email'
                        required
                    />
                </div>
                <Button text="Join the waitlist" onClick={handleSubmit} />
            </form>
        </div>
    );
};

export default SignupForm;
