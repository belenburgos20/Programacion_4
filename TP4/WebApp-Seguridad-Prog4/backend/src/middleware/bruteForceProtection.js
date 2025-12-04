const loginAttempts = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of loginAttempts.entries()) {
    if (now - data.lastAttempt > 3600000) {
      loginAttempts.delete(ip);
    }
  }
}, 3600000);

const bruteForceProtection = async (req, res, next) => {
  const clientIp = req.ip;
  const { captchaToken } = req.body;

  const attemptData = loginAttempts.get(clientIp) || { count: 0, lastAttempt: 0 };

  if (attemptData.count >= 3 && !captchaToken) {
    console.log(`[BRUTE] CAPTCHA required for IP ${clientIp} (${attemptData.count} attempts)`);
    return res.status(400).json({ error: "captcha required" });
  }

  if (attemptData.count > 0) {
  const delayMs = Math.min(1000 * Math.pow(2, attemptData.count - 1), 10000);
  console.log(`[BRUTE] Delaying request from ${clientIp} by ${delayMs}ms (attempt ${attemptData.count + 1})`);
  await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  attemptData.count++;
  attemptData.lastAttempt = Date.now();
  loginAttempts.set(clientIp, attemptData);

  next();
};

const recordFailedAttempt = (req) => {
  const clientIp = req.ip;
  const attemptData = loginAttempts.get(clientIp) || { count: 0, lastAttempt: 0 };
  attemptData.count = Math.max(attemptData.count, 1); 
  attemptData.lastAttempt = Date.now();
  loginAttempts.set(clientIp, attemptData);
  console.log(`[BRUTE] Recorded failed login attempt for IP ${clientIp} (total: ${attemptData.count})`);
};

const clearFailedAttempts = (req) => {
  const clientIp = req.ip;
  if (loginAttempts.has(clientIp)) {
    loginAttempts.delete(clientIp);
    console.log(`[BRUTE] Cleared failed attempts for IP ${clientIp}`);
  }
};

module.exports = {
  bruteForceProtection,
  recordFailedAttempt,
  clearFailedAttempts
};

