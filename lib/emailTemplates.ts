export function otpEmailTemplate(code: string) {
  return { subject: "Your UniCuro verification code", html: `<h1>Your UniCuro code</h1><p style="font-size:32px;font-weight:900">${code}</p><p>This code expires shortly.</p>` };
}
export function alertEmailTemplate(title: string, message: string) {
  return { subject: title, html: `<h1>${title}</h1><p>${message}</p><p>UniCuro — Save Money. Make Money. Succeed at University.</p>` };
}
export function scholarshipAlertTemplate(name: string, deadline: string) { return alertEmailTemplate("Scholarship deadline reminder", `${name} closes on ${deadline}.`); }
export function discountAlertTemplate(merchant: string, offer: string) { return alertEmailTemplate("New student discount", `${merchant}: ${offer}`); }
