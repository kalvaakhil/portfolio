package com.portfolio.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    // Optional injection — JavaMailSender is only available when spring.mail.* is configured
    private final Optional<JavaMailSender> mailSender;

    @Value("${portfolio.email.to}")
    private String toEmail;

    @Value("${portfolio.email.sender}")
    private String senderEmail;

    @Value("${portfolio.email.enabled}")
    private boolean emailEnabled;

    public EmailService(Optional<JavaMailSender> mailSender) {
        this.mailSender = mailSender;
        if (mailSender.isPresent()) {
            log.info("EmailService initialized with JavaMailSender — SMTP email dispatch is available");
        } else {
            log.info("EmailService initialized without JavaMailSender — email dispatch is disabled");
        }
    }

    @Async
    public void sendContactNotification(String senderName, String senderEmailAddress, String subject, String messageText) {
        log.info("=== PORTFOLIO CONTACT FORM SUBMISSION ===");
        log.info("From: {} <{}>", senderName, senderEmailAddress);
        log.info("Subject: {}", subject);
        String preview = messageText == null ? "" : (messageText.length() > 120 ? messageText.substring(0, 120) + "..." : messageText);
        log.info("Message preview: {}", preview);
        log.info("=========================================");

        if (!emailEnabled) {
            log.info("Email notifications are disabled (portfolio.email.enabled=false). Skipping dispatch.");
            return;
        }

        if (mailSender.isEmpty()) {
            log.warn("JavaMailSender is not configured. Cannot dispatch email notification for contact from: {} <{}>",
                    senderName, senderEmailAddress);
            return;
        }

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(toEmail);
            mailMessage.setFrom(senderEmail);
            mailMessage.setSubject("Portfolio Contact: " + subject);
            mailMessage.setText(String.format(
                    "New contact message from portfolio website:%n%n" +
                    "Name:    %s%n" +
                    "Email:   %s%n" +
                    "Subject: %s%n%n" +
                    "Message:%n%s",
                    senderName, senderEmailAddress, subject, messageText
            ));

            mailSender.get().send(mailMessage);
            log.info("Contact notification email dispatched successfully to {}", toEmail);
        } catch (Exception ex) {
            log.error("Failed to dispatch contact notification email to {}: {}", toEmail, ex.getMessage(), ex);
        }
    }
}
