const Signup = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create user.');
            }

            // User created successfully
            form.reset();
            alert('Account created successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to create account. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" placeholder="Enter your First Name" required />
                </div>
                <div className="input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Enter your Last Name" required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your Email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="phone">Phone No</label>
                    <input type="text" id="phone" name="phone" placeholder="Enter your Phone Number" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Create Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter a Password" required />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required />
                </div>
                <button type="submit" className="btn-register">Signup</button>
            </form>
            <p id="errorMessage" className="error-message"></p>
        </div>
    );
};

export default Signup;
