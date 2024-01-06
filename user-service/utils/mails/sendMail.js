const { resendMails } = require("../../lib/resend/resend.connect");

/**
 * Sends an email using the resendMails library.
 *
 * @param {string} from - The sender's email address.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML content of the email.
 * @returns {Object} - An object with information about the email sending result.
 *                    - {string|null} error - Error message, or null if no error.
 *                    - {boolean} isError - Indicates if an error occurred.
 *                    - {*} value - The result of the email sending, or null if an error occurred.
 */

exports.sendMail = async ({ from, to, subject, html }) => {
  try {
    console.log(from, to, subject, html);
    // Use the resendMails library to send the email
    const { data, error } = await resendMails.emails.send({
      from,
      to,
      subject,
      html
    });

    console.log({ data, error });

    // If there is an error, throw an exception
    if (error) {
      throw {
        error,
        isError: true,
        value: null
      };
    }

    // Return the result of the email sending with no error
    return {
      error: null,
      isError: false,
      value: data
    };
  } catch (error) {
    // Handle any exceptions during email sending
    return {
      error: error.message,
      isError: error.isError,
      value: error.value
    };
  }
};
