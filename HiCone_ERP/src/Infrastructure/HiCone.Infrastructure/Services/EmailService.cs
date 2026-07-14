using System.Net;
using System.Net.Mail;
using HiCone.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace HiCone.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var host = _configuration["Smtp:Host"] ?? "localhost";
        var portStr = _configuration["Smtp:Port"] ?? "25";
        var username = _configuration["Smtp:Username"];
        var password = _configuration["Smtp:Password"];
        var enableSslStr = _configuration["Smtp:EnableSsl"] ?? "false";
        var fromEmail = _configuration["Smtp:FromEmail"] ?? "no-reply@hicone.com";

        int.TryParse(portStr, out var port);
        bool.TryParse(enableSslStr, out var enableSsl);

        _logger.LogInformation("Sending email to {To} with subject '{Subject}' via SMTP {Host}:{Port}", to, subject, host, port);

        try
        {
            using var client = new SmtpClient(host, port)
            {
                EnableSsl = enableSsl,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = string.IsNullOrEmpty(username)
            };

            if (!string.IsNullOrEmpty(username))
            {
                client.Credentials = new NetworkCredential(username, password);
            }

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mailMessage.To.Add(to);

            await client.SendMailAsync(mailMessage);
            _logger.LogInformation("Email sent successfully to {To}", to);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {To} via SMTP", to);
            // We throw the exception so that the caller knows SMTP failed, but we log it as well.
            throw;
        }
    }
}
