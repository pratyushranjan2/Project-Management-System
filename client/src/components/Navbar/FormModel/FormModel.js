import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function FormModel() {
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('SignIn');
    // console.log(formType);

    return (
        <>
            <button
                type="button"
                className="btn btn-primary px-4 sm:px-6 min-h-0 h-10"
                onClick={() => setShowForm(true)}
            >
                Log In
            </button>

            {showForm ? (
                formType === 'SignIn' ? (
                    <SignIn
                        setShowForm={setShowForm}
                        setFormType={setFormType}
                    />
                ) : (
                    <SignUp
                        setShowForm={setShowForm}
                        setFormType={setFormType}
                    />
                )
            ) : null}
        </>
    );
}
