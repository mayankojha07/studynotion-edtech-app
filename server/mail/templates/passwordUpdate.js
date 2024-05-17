exports.passwordUpdate = (email, name) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0" /> -->
      <title>Password Upadte Confirmation</title>
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
          max-width: 660px;
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
  
        .support {
          font-size: 14px;
          color: #999999;
          margin-bottom: 20px;
        }
  
        .highlight {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app">
          <img
            src="https://i.ibb.co/7Xyj3PC/logo.png"
            alt="StudyNotion Logo"
            class="logo"
          />
        </a>
        <div class="message">Password Upadte Confirmation</div>
        <div class="body">
          <p>Hey ${name},</p>
          <p>
            Your password successfully update for the email
            <span class="highlight">${email}</span>
          </p>
          <p>
            If you didn't request for this change, please contact us immediately
            to secure your account.
          </p>
        </div>
        <div class="support">
          If you have any question or need further assistance, please feel free to
          contact us at
          <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are
          here to help!
        </div>
      </div>
    </body>
  </html>`;
};
