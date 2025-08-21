import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { api } from '../../services/api';
import { testApiConfig, testApiCall } from '../../utils/testApi';
import { testBackendHealth } from '../../utils/testBackend';
import { Input } from '@lib/components/ui/input';
import { Button } from '@lib/components/ui/button';
import { Checkbox } from "@lib/components/ui/checkbox";

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
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
		
		// Test API configuration and backend health on component mount
		const runTests = async () => {
			console.log('=== Running API Tests ===');
			const config = testApiConfig();
			console.log('API Config Test Result:', config);
			
			const healthTest = await testBackendHealth();
			console.log('Backend Health Test Result:', healthTest);
		};
		
		runTests();
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

		// Validate required fields
		if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
			setError('Please fill all required fields.');
			setLoading(false);
			return;
		}

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
			// Test API configuration before making the request
			console.log('Testing API before signup...');
			const apiTest = await testApiCall();
			console.log('API Test Result:', apiTest);
			
			// POST all required fields to backend
			const payload = {
				first_name: formData.first_name,
				last_name: formData.last_name,
				email: formData.email,
				phone: formData.phone,
				username: formData.username,
				password: formData.password,
			};
			
			console.log('Signup payload:', payload);
			const response = await api.register(payload);
			console.log('Signup response:', response);

			setSuccess('Account created successfully! Redirecting...');
			localStorage.setItem('session', JSON.stringify(response.session));
			localStorage.setItem('user', JSON.stringify(response.customer));
			localStorage.setItem('customer_id', response.customer.id);

			setTimeout(() => {
				window.location.href = '/user';
			}, 1500);
		} catch (err: any) {
			console.error('Full signup error:', err);
			console.error('Error message:', err?.message);
			console.error('Error stack:', err?.stack);
			
			let serverError = err?.message || 'Failed to create account. Please try again.';
			if (typeof serverError === 'string' && serverError.toLowerCase().includes('email or username already exists')) {
				serverError = 'An account with this email or username already exists. Please log in or use a different email.';
			}
			setError(serverError);
			console.error('Signup error:', err);
		} finally {
			setLoading(false);
		}
	};
	  
	return (
		<div className="relative w-screen min-h-screen flex items-center justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-2 overflow-hidden" id="signUp">
			<div className="w-full max-w-[750px] flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black shrink-0 p-4">
				<img src="/images/blindzy-logo.png" className="w-fit" alt="blindzy-logo" />
				<div className="w-full flex items-center gap-2 shrink-0 text-mediumGrey">
					<Icon icon="uil:plus" className="text-[18px]" />
					<div className="w-full h-[1px] bg-mediumGrey"></div>
					<Icon icon="uil:plus" className="text-[18px]" />
				</div>
				<h3 className="text-xxl">SIGN UP</h3>
				
				{!viaEmail ? (
					<>
						<Button 
							variant={'light'}
							size={'large'}
							className="w-full"
						>
							<Icon icon="flat-color-icons:google" className="text-[28px] shrink-0" />
							<span className="text-sm">Continue as Google</span>
						</Button>
						<Button onClick={() => setViaEmail(true)} 
							variant={'light'}
							size={'large'}
							className="w-full"
						>
							<span className="text-sm">
								Sign up via Email
							</span>
						</Button>
						
					</>
				) : (
					<form onSubmit={handleSubmit} className="w-full">
						<div className="w-full grid col-span-12 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
							<div className="sm:col-span-6 col-span-12">
								<Input type="text" 
									id="first_name"
									placeholder="First Name" 
									value={formData.first_name} 
									onChange={handleChange} required 
								/>
							</div>
							<div className="sm:col-span-6 col-span-12">
								<Input type="text" 
									id="last_name"
									placeholder="Last Name" 
									value={formData.last_name} 
									onChange={handleChange} required 
								/>
							</div>
							<div className="sm:col-span-6 col-span-12">
								<Input type="email" 
									id="email"
									placeholder="Email" 
									value={formData.email} 
									onChange={handleChange} required 
								/>
							</div>
							<div className="sm:col-span-6 col-span-12">
								<Input type="text" 
									id="signup-phone"
									placeholder="Phone" 
									value={formData.phone} 
									onChange={handleChange} 
								/>
							</div>
							<div className="col-span-12">
								<Input type="text" 
									id="username"
									placeholder="Username" 
									value={formData.username} 
									onChange={handleChange} 
								/>
							</div>
							<div className="col-span-12">
								<Input type="password" 
									id="password"
									placeholder="Password" 
									value={formData.password} 
									onChange={handleChange} required 
								/>
							</div>
							<div className="col-span-12">
								<Input type="password" 
									id="confirmPassword"
									placeholder="Confirm Password" 
									value={formData.confirmPassword} 
									onChange={handleChange} required 
								/>
							</div>
							<div className="col-span-12">
								<Button 
									type="submit"
									variant={'primary'}
									size={'large'}
									className="w-full"
								 	disabled={loading}>
									{loading ? 'Creating Account...' : 'Sign Up'}
								</Button>
							</div>
						</div>
					</form>
				)}
				<div className="w-full flex flex-col sm:flex-row items-center sm:justify-between justify-center gap-2 sm:gap-0">
					<div className="flex items-center gap-2 shrink-0">
						<Checkbox id="agree"/>
						<label htmlFor="agree" className="text-sm normal cursor-pointer">
							By Signing up you agree to our Terms and Policies
						</label>
					</div>
					<div className="flex items-center gap-2 shrink-0">
						<Checkbox id="Remember"/>
						<label htmlFor="Remember" className="text-sm normal cursor-pointer">
							Remember me
						</label>
					</div>
				</div>
				<div className="flex items-center justify-center gap-1 text-sm">
					Already have an account?
					<a href="/login" className="text-[--primary] transition hover:underline focus:outline-none">Login</a>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
