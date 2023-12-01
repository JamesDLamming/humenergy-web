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
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="p-2 border rounded-md w-full"
                            required
                        />
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
                        className="p-2 border rounded-md w-full"
                        required
                    />
                </div>
                <Button text="Submit" type="submit" className="w-full" />
            </form>
        </div>
    );
};

export default SignupForm;
