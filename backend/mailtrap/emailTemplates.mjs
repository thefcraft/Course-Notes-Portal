import fs from 'node:fs';

export const VERIFICATION_EMAIL_TEMPLATE = fs.readFileSync('backend/mailtrap/templates/verification.html', 'utf8');

export const PASSWORD_RESET_SUCCESS_TEMPLATE = fs.readFileSync('backend/mailtrap/templates/password_reset_success.html', 'utf8');

export const PASSWORD_RESET_REQUEST_TEMPLATE = fs.readFileSync('backend/mailtrap/templates/password_reset_request.html', 'utf8');

export const WELCOME_EMAIL_TEMPLATE = fs.readFileSync('backend/mailtrap/templates/welcome.html', 'utf8');