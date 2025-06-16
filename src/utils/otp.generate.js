export const otpGenerate = async () => {
	return Math.floor(100000 + Math.random() * 900000)
}
