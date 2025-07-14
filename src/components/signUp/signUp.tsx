import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { api } from '../../services/api';

function SignUp() {
	const [viaEmail, setViaEmail] = useState(false);
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		username: '',
		password: '',
		confirmPassword: ''
	});
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const lenis = useLenis();

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName = e.target.id === 'signup-phone' ? 'phone' : e.target.id;
		setFormData({
			...formData,
			[fieldName]: e.target.value
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
      
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
      
        // Validate email format
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError('Enter a valid email address');
          setLoading(false);
          return;
        }
      
        // Validate terms agreement
        if (!agreedToTerms) {
          setError('You must agree to our Terms and Policies');
          setLoading(false);
          return;
        }
      
        try {
          const response = await api.register({
            email: formData.email,
            password: formData.password,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            username: formData.username,
          });
      
          setSuccess('Account created successfully! Redirecting...');
          localStorage.setItem('session', JSON.stringify(response.session));
          localStorage.setItem('user', JSON.stringify(response.customer));
          localStorage.setItem('customer_id', response.customer.id); // ✅ Required
      
          setTimeout(() => {
            window.location.href = '/user';
          }, 1500);
        } catch (err: any) {
          const serverError =
            err?.response?.data?.error ||
            err?.message ||
            'Failed to create account. Please try again.';
          setError(serverError);
          console.error('Signup error:', err);
        } finally {
          setLoading(false);
        }
      };
      
	return (
		<div className="relative w-screen h-screen flex items-center justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-2 overflow-hidden" id="signUp">
			<div className="w-full max-w-[750px] flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black shrink-0 p-4">
				<img src="/images/blindzy-logo.png" className="w-fit" alt="blindzy-logo" />
				<div className="w-full flex items-center gap-2 shrink-0 text-mediumGrey">
					<Icon icon="uil:plus" className="text-[18px]" />
					<div className="w-full h-[1px] bg-mediumGrey"></div>
					<Icon icon="uil:plus" className="text-[18px]" />
				</div>
				<h3 className="text-xxl">SIGN UP</h3>

				{error && (
					<div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
						{error}
					</div>
				)}

				{success && (
					<div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded">
						{success}
					</div>
				)}

				{!viaEmail ? (
					<>
						<button className="w-full p-4 flex items-center justify-center gap-2 transition border border-[--Black] hover:bg-[--Black] hover:text-[--white] rounded-[50px]">
							<Icon icon="flat-color-icons:google" className="text-[28px] shrink-0" />
							<span className="text-sm">Continue as Google</span>
						</button>
						<button onClick={() => setViaEmail(true)} className="w-full text-sm p-4 flex items-center justify-center gap-1 transition border border-[--Black] hover:bg-[--Black] hover:text-[--white] rounded-[50px]">
							Sign up via Email
						</button>
						<div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
							<div className="flex items-center gap-2">
								<input
									type="checkbox"
									id="policies"
									name="terms"
									checked={agreedToTerms}
									onChange={(e) => setAgreedToTerms(e.target.checked)}
									className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
								/>
								<label htmlFor="policies" className="text-sm cursor-pointer">
									By Signing up you agree to our Terms and Policies
								</label>
							</div>
							<div className="flex items-center gap-1 text-sm">
								Already have an account?
								<a href="/login" className="text-primary">Login</a>
							</div>
						</div>
					</>
				) : (
					<form onSubmit={handleSubmit} className="w-full">
						<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
							<div className="w-full flex flex-col sm:flex-row items-center gap-4">
								<input type="text" className="formInput" id="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
								<input type="text" className="formInput" id="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
							</div>
							<div className="w-full flex flex-col sm:flex-row items-center gap-4">
								<input type="email" className="formInput" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
								<input type="text" className="formInput" id="signup-phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
							</div>
							<input type="text" className="formInput" id="username" placeholder="Username" value={formData.username} onChange={handleChange} />
							<input type="password" className="formInput" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
							<input type="password" className="formInput" id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
							<button className="w-full cus-btn small text-sm rounded-full-override" type="submit" disabled={loading}>
								{loading ? 'Creating Account...' : 'Sign Up'}
							</button>
							<div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
								<div className="flex items-center gap-2">
									<input type="checkbox" id="remember" name="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2" />
									<label htmlFor="remember" className="text-sm cursor-pointer">Remember me</label>
								</div>
								<div className="flex items-center gap-1 text-sm">
									Already have an account?
									<a href="/login" className="text-primary">Login</a>
								</div>
							</div>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}

export default SignUp;
