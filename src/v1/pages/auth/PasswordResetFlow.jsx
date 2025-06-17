import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import VerifyCode from './verifyCode';
import ResetPassword from './resetPassword';

const PasswordResetFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      {step === 1 && <ForgotPassword onSuccess={(e) => { setEmail(e); setStep(2); }} />}
      {step === 2 && <VerifyCode email={email} onVerified={(c) => { setCode(c); setStep(3); }} />}
      {step === 3 && <ResetPassword email={email} code={code} />}
    </div>
  );
};

export default PasswordResetFlow;
