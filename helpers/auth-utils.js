import { hash, compare } from 'bcryptjs';
export async function hashedPassword(password) {
	const hashedPassword = await hash(password);
	return hashedPassword;
}
export async function hashedPassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}
