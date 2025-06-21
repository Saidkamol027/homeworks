import NodeCache from 'node-cache'

const otpCache = new NodeCache({ stdTTL: 600 })

export function saveOtp(email, otp) {
	otpCache.set(email, otp)
}

export function verifyOtp(email, otp) {
	const existsOtp = otpCache.get(email)
	return otp == existsOtp
}

export function deleteOtp(email) {
	otpCache.del(email)
}
