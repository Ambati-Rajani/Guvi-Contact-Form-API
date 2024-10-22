
interface ContactFormData { 
    name: string;
    email: string;
    contactNumber: string;
    subject: string;
    message: string;
}


function validateForm(data: ContactFormData): string | null {
    if (!data.name || !data.email || !data.contactNumber || !data.subject || !data.message) {
        return 'Please fill in all fields.';
    }
    
   
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(data.email)) {
        return 'Please enter a valid email address.';
    }

    return null;
}

async function submitForm(data: ContactFormData): Promise<Response> {
    const apiUrl = 'https://67176262b910c6a6e027d5ba.mockapi.io/submission'; 

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to submit the form. Please try again later.');
    }
}
document.getElementById('guviForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

   
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contactNumber = (document.getElementById('contactNumber') as HTMLInputElement).value;
    const subject = (document.getElementById('subject') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    const formData: ContactFormData = {
        name,
        email,
        contactNumber,
        subject,
        message,
    };

    const validationError = validateForm(formData);

    const statusMessage = document.getElementById('statusMessage');

    if (validationError) {
        statusMessage!.textContent = validationError;
        statusMessage!.className = 'error';
        return;
    }

    try {
        const response = await submitForm(formData);

        if (response.ok) {
            statusMessage!.textContent = 'Form Submitted Successfully!';
            statusMessage!.className = 'success';
            (document.getElementById('guviForm') as HTMLFormElement).reset(); 
        } else {
            statusMessage!.textContent = 'Submission Failed!';
            statusMessage!.className = 'error';
        }
    } catch (error) {
        statusMessage!.textContent = error.message;
        statusMessage!.className = 'error';
    }
});
