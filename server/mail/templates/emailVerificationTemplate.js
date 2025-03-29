
const otpTemplate = (id, name) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href=""><img class="logo"
					src="../../logo.png" alt="AuthentiCred"></a>
			<div class="message">Employee detail form</div>
			<div class="body">
				<p>Dear ${name},</p>
				<p>Thank you for choosing AuthentiCred. To complete your background verification, please fill in your details using the following link:</p>
				<a href="https://authcred.prannay.live/form/${id}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 25px; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='#0056b3'" onmouseout="this.style.backgroundColor='#007bff'">
  Fill Details Here
</a>



				<p>This link is valid for 24 hours.</p>
			</div>

			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:authenticred.gmail.com">authenticred.gmail.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};
export default otpTemplate;