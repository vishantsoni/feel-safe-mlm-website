'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import serverCallFuction from '@/lib/constantFunction';

interface FormData {
  phone: string;
  name: string;
  distributor_code?: number | null;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const refId = searchParams.get('ref');
  const initialReferrerId = refId ? parseInt(refId, 10) : null;

  const [formData, setFormData] = useState<FormData>({
    phone: '',
    name: '',
    distributor_code: initialReferrerId,
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [step, setStep] = useState(1);

  // Step indicator
  const steps = ['Phone', 'Basic Details', 'Account Details', 'Success'];
  const progress = ((step - 1) / 3) * 100;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone);
      case 2:
        return formData.name.trim().length > 0;
      case 3:
        return formData.email.includes('@') && formData.password.length >= 6 && formData.password === formData.confirmPassword;
      default:
        return false;
    }
  };


  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      setError('');
    } else {
      setError('Please fill valid details for this step');
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        phone: formData.phone,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        distributor_code: formData.distributor_code || undefined
      };
      const res = await serverCallFuction('POST', 'api/ecom/auth/register', submitData);
      if(res.status){
        setStep(4);
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }else{
        setError(res.message || 'Registration Failed');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration Failed';
      const apiError = err as any;
      setError(apiError?.response?.data?.message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hide Navbar/Footer effect via reduced padding for cleaner full-screen look */}
      <div className="bg-light min-vh-100 d-flex align-items-center py-5" style={{ paddingTop: '20px', paddingBottom: '20px' }}>


        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <div className="text-center mb-5">
                    <Image
                      src="/assets/images/logo.png"
                      alt="Feel Safe Co."
                      width={80}
                      height={80}
                      className="mb-3"
                      priority
                    />
                    <h1 className="fw-bold mb-1" style={{ color: '#1C1C1C' }}>
                      Join Feel Safe MLM
                    </h1>
                    <p className="text-muted">Step {step} of 3 - {steps[step - 1]}</p>
                    {/* Progress bar */}
                    <div className="progress mb-4" style={{ height: '8px' }}>
                      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    {initialReferrerId && (
                      <div className="alert alert-info">
                        Prefilled Distributor Code: {initialReferrerId}
                      </div>
                    )}
                  </div>

                  {success && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      Registration successful! Redirecting to login...
                      <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {error}
                      <button type="button" className="btn-close" onClick={() => setError('')}></button>
                    </div>
                  )}

                  <form onSubmit={step === 3 ? handleSubmit : undefined}>
                    {step === 1 && (
                      <div className="mb-4">
                        <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control form-control-lg bg-light border-0 py-3"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Enter 10-digit phone (e.g. 9876543210)"
                          maxLength={10}
                        />
                      </div>
                    )}
                    {step === 2 && (
                      <>
                        <div className="mb-4">
                          <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                          <input
                            type="text"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="distributor_code" className="form-label fw-semibold">Distributor Code (Optional)</label>
                          <input
                            type="number"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="distributor_code"
                            value={formData.distributor_code || ''}
                            onChange={(e) => setFormData({ ...formData, distributor_code: parseInt(e.target.value) || null })}
                            placeholder="Enter distributor code if you have one"
                          />
                        </div>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <div className="mb-4">
                          <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                          <input
                            type="email"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="password" className="form-label fw-semibold">Password</label>
                          <input
                            type="password"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="At least 6 characters"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Confirm your password"
                          />
                        </div>
                      </>
                    )}


                    {step === 3 && (
                      <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="terms" required />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the <Link href="/terms-conditions" className="text-decoration-none">Terms</Link> and{' '}
                          <Link href="/privacy-policy" className="text-decoration-none">Privacy Policy</Link>
                        </label>
                      </div>
                    )}
                    <div className="d-flex gap-2 mt-4">
                      {step > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary flex-fill py-3"
                          onClick={prevStep}
                        >
                          Previous
                        </button>
                      )}
                      <button
                        type={step === 3 ? "submit" : "button"}
                        className="btn text-white fw-bold py-3 shadow flex-fill"
                        style={{ backgroundColor: "#00A9E0", border: "none", transition: "0.3s" }}
                        onClick={step !== 3 ? nextStep : undefined}
                        disabled={loading || (step !== 3 && !validateStep()) || (step === 3 && !document.getElementById('terms')?.['checked'])}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Creating Account...
                          </>
                        ) : step === 3 ? (
                          'Register Now'
                        ) : (
                          'Next'
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">Already have an account?</p>
                    <Link href="/login" className="btn btn-outline-primary px-4 py-2 fw-semibold">
                      Login Here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

