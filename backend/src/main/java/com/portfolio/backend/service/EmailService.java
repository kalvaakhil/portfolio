package com.portfolio.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${portfolio.email.to}")
    private String toEmail;

    @Value("${portfolio.email.sender}")
    private String senderEmail;

    @Value("${portfolio.email.enabled}")
    private boolean emailEnabled;

    public void sendContactNotification(String senderName, String senderEmailAddress, String subject, String messageText) {
        log.info("=== PORTFOLIO CONTACT FORM SUBMISSION ===");
        log.info("From: {} <{}>", senderName, senderEmailAddress);
        log.info("Subject: {}", subject);
        log.info("Message: {}", messageText);
        log.info("=========================================");

        if (!emailEnabled || mailSender == null) {
            log.info("Email alerts are disabled or SMTP server is not set up. Email dispatch skipped.");
            return;
        }

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(toEmail);
            mailMessage.setFrom(senderEmail);
            mailMessage.setSubject("Portfolio: " + subject);
            mailMessage.setText(String.format(
                    "New contact message from portfolio website:\n\n" +
                    "Name: %s\n" +
                    "Email: %s\n" +
                    "Subject: %s\n\n" +
                    "Message:\n%s", 
                    senderName, senderEmailAddress, subject, messageText
            ));
            
            mailSender.send(mailMessage);
            log.info("Notification email dispatched to {}", toEmail);
        } catch (Exception ex) {
            log.error("Failed to dispatch notification email: {}", ex.getMessage());
        }
    }
}
