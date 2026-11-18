'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [os, setOs] = useState('Windows');
  const [browser, setBrowser] = useState('Chrome');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent;
      if (ua.indexOf('Windows') !== -1) setOs('Windows 10/11');
      else if (ua.indexOf('Mac') !== -1) setOs('macOS');
      else if (ua.indexOf('Linux') !== -1) setOs('Linux');
      else if (ua.indexOf('Android') !== -1) setOs('Android');
      else if (ua.indexOf('iPhone') !== -1) setOs('iOS');

      if (ua.indexOf('Chrome') !== -1) setBrowser('Chrome');
      else if (ua.indexOf('Firefox') !== -1) setBrowser('Firefox');
      else if (ua.indexOf('Safari') !== -1) setBrowser('Safari');
      else if (ua.indexOf('Edge') !== -1) setBrowser('Edge');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.post('/auth/login', {
        myUserName: username,
        mypassword: password,
        ip_address: '127.0.0.1',
        browser,
        os,
      });

      if (res.success) {
        router.push('/dashboard');
      } else {
        setErrorMessage(res.message || 'User Name or password is incorrect !');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div themebg-pattern="theme1" style={{ minHeight: '100vh', backgroundColor: '#FFF' }}>
      <section className="login-block" style={{ backgroundColor: '#FFF', padding: '50px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form onSubmit={handleSubmit} className="md-float-material form-material">
                <input name="os" type="hidden" value={os} />
                <input name="browser" type="hidden" value={browser} />
                <input name="ip_address" type="hidden" value="127.0.0.1" />

                <div className="text-center">
                  <img src="/assets/images/GEIELogo.png" alt="GEIE Logo" style={{ marginBottom: 20 }} />
                </div>

                <div className="auth-box card" style={{ maxWidth: '450px', margin: '0 auto', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
                  <div className="card-block">
                    <div className="row m-b-20">
                      <div className="col-md-12 text-center">
                        <h3 className="text-center" style={{ color: '#006', fontWeight: 'bold' }}>
                          Sign In
                        </h3>
                        <p style={{ color: '#666', fontSize: '13px', marginTop: 5 }}>
                          Smart GSM Solar Street Light & RMS Management System
                        </p>
                      </div>
                    </div>

                    {errorMessage && (
                      <div
                        className="alert alert-danger"
                        style={{ textAlign: 'center', fontSize: '13px', padding: '8px' }}
                      >
                        {errorMessage}
                      </div>
                    )}

                    <div className="form-group form-primary" style={{ marginBottom: 25 }}>
                      <input
                        type="text"
                        name="myUserName"
                        className="form-control"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="User ID / Username"
                      />
                      <span className="form-bar"></span>
                    </div>

                    <div className="form-group form-primary" style={{ marginBottom: 25 }}>
                      <input
                        type="password"
                        name="mypassword"
                        className="form-control"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                      <span className="form-bar"></span>
                    </div>

                    <div className="row m-t-30">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                          style={{
                            backgroundColor: '#006',
                            borderColor: '#006',
                            padding: '10px',
                            fontWeight: 'bold',
                          }}
                        >
                          {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      <div className="col-md-12 text-center" style={{ fontSize: '12px', color: '#999' }}>
                        Jharkhand Renewable Energy Development Agency (JREDA)
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
